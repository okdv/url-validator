import {objToArr} from './helpers'
import {urlObj} from '../assets/data'

<<<<<<< HEAD
const throwErr = (obj) => obj
=======
export const data = {
    protocol: {
        name: "protocol",
        req: true,
        example: "http(s)://",
        patchable: true,
        default: "http://",
        regex: /^(https?:\/\/)?/,
        description: "None http protocols are not supported at this time. A protocol tells the browser how to expect data to be exchanged. Must be forwarded by ://"
    },
    domain: {
        name: "domain",
        req: true,
        example: "www.domain.com or 0.0.0.0",
        patchable: false,
        default: null,
        regex: /((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}||((\d{1,3}\.){3}\d{1,3}))/i,
        description: "Can be in a traditional sub.domain.ext format, or in an IPv4 format. This is a unique identifier to an online resource, like website. This is alphanumeric, allows some special characters like -. Must end in an extension, such as .com."
    },
    path: {
        name: "path",
        req: false,
        example: "/folder/file",
        patchable: true,
        default: "/",
        regex: /((:\d+)?(\/[/aA-zZ\d-%_.~+]*))/,
        description: "This refers to the exact location of a resource within a website. Path segments begin with /, are alphanumeric, and allow a range of special characters"
    },
    query: {
        name: "query string",
        req: false,
        example: "?this=that",
        patchable: false,
        default: null,
        regex: /(\?[;&aA-zZ\d%_.~+=-]*)/,
        description: "This assigns variable parameters to a URL. Is started by a ? operation, and contains a set of key=value pairs."
    },
    fragment: {
        name: "fragment",
        req: false,
        example: "#id",
        patchable: false,
        default: null,
        regex: /(#[;&aA-zZ\d%_.~+=-]*)?$/,
        description: "This refers to an internal section or identifier within a document, introduced by a #. Allows a range special characters"
    },
}
>>>>>>> 8287bde4b16f50c4344328ae8f16e91a26fd1e79

const decodeEntities = (str) => {
    let errs = []
    // Textarea instead of div to prevent XSS vulnerability
    var el = document.createElement('textarea')
    el.innerHTML = str
    const decoded = el.value
    if (str.length > decoded.length) { 
        // Throw (warning) error if decoded is different than original
        errs.push(throwErr({})) // FIX
    }
    return [decoded,errs]
}

const splitStr = (str,rgx,dif) => {
    
}

const splitLoop = (str,obj) => {
    let errs = []
    let url = urlObj
    let rest
    const arr = objToArr(obj)
    arr.forEach(item => {
        
    });
}

<<<<<<< HEAD
// Acts as handler
export const validation = (url) => {
    let errs = []
    // Decode all HTML entities
    const decodeEntitiesRes = decodeEntities(url)
    const decoded = decodeEntitiesRes[0]
    decodeEntitiesRes[1].map(err => errs.push(err))
    // Split URL via loop iteration
}
=======
// Validate against a combined regular expression
>>>>>>> 8287bde4b16f50c4344328ae8f16e91a26fd1e79
