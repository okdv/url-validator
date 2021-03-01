const data = {
  protocol: {
    name: "protocol",
    req: true,
    example: "http(s)://",
    patchable: true,
    default: "http://",
    regex: /^(https?:\/\/)?/
  },
  domain: {
    name: "domain",
    req: true,
    example: "www.domain.com or 0.0.0.0",
    patchable: false,
    default: null,
    regex: /((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}||((\d{1,3}\.){3}\d{1,3}))/
  },
  path: {
    name: "path",
    req: false,
    example: "/folder/file",
    patchable: true,
    default: "/",
    regex: /((:\d+)?(\/[\/a-z\d-%_.~+]*))/
  },
  query: {
    name: "query",
    req: false,
    example: "?this=that",
    patchable: false,
    default: null,
    regex: /(\?[;&a-z\d%_.~+=-]*)/
  },
  fragment: {
    name: "fragment",
    req: false,
    example: "?this=that",
    patchable: false,
    default: null,
    regex: /(\#[-a-z\d_]*)?$/
  },
}

const throwErr = (obj, prepend, append, msg) => {
  prepend = (!prepend || prepend === null) ? ((obj.req === true && obj.patchable === false) ? "Fatal" : "Warning") : prepend
  append = (!append || append === null) ? ((obj.patchable === false) ? (obj.req === false ? "Could not be patched" : "") : ("Patched with " + obj.default)) : append
  const str = prepend + ": " + obj.name + ((!msg || msg === null) ? " is missing/invalid - " : msg) + append + (obj.example !== null ? (" - " + obj.example) : "")
  return str
}

/* Decode HTML Entities that are within the port/path, query, or fragment
 - Also kinda hacky, but it works so long permitted URL characters arent changed...
 */
const decode = (str) => {
  let entities = [
    ['amp','&'],
    ['#45','-'],
    ['percnt','%'],
    ['lowbar','_'],
    ['period','.'],
    ['#126','~'],
    ['plus','+'],
    ['equals','='],
    ['semi',';'],
    ['num','#']
  ]
  for (var i=0; i < entities.length;i++) {
    str = str.replace(new RegExp('&'+entities[i][0]+';','g'), entities[i][1])
  }
  return str
}

// Handling function for validating individual errors and results
export const validate = (url) => {
  let errs = []
  let res = {}
  url = decode(url)
  // Loop through data object
  Object.keys(data).forEach(key => {
    // Declare nested object and create global RegEx 
    const obj = data[key]
    const rgx = new RegExp(obj.regex.toString().replace(/^\//,"").replace(/\/$/,""))
    /* So this is kind of a hack to prevent path regex from catching on protocol forward (://) but it works lmao 
        - checks if protocol has been found, if so it removes it from string thats being executed
        - otherwise the path RegEx will match on /www.domain.com as it would be a valid url path as well
    */
    const executable = (res.protocol && res.protocol !== null) ? url.replace(data.protocol.regex, "") : url
    const exec = rgx.exec(executable)
    const val = (exec !== null && exec[0].length > 0) ? exec[0] : null
    // Check if RegEx returned match
    if (val === null) {
      // Throw error and check for patch
      errs.push(throwErr(obj))
      if (obj.patchable === true && obj.default !== null && obj.default.length > 0) {
        res[key] = obj.default
      } else {
        res[key] = null
      }
    } else {
      res[key] = val
    }
  })
  // Confirm validation was successful
  if (errs.length > 0 || Object.keys(res).length > 0) {
    let ret = [res,errs]
    return ret
  } else {
    return [null,[]]
  }
}

// Test string against one large Regular Expression (created from combining all RegEx's in data object)
export const fullRegex = (str) => {
  let rgxStr = ""
  // Loop through data object
  Object.keys(data).forEach(key => {
    // Get and prepare regex from each nested object
    const rgxRaw = new RegExp(data[key].regex)
    rgxStr += rgxRaw.toString().replace(/^\//,"").replace(/\/$/,"")
  })
  // Create and test new RegEx
  const rgx = new RegExp(rgxStr.replace(/\+$/,""), "i")
  return rgx.test(str)
}