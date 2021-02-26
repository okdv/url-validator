export default function validateUrl(url) {
    let errs = []
    // Result is default to err until corrected to URL
    let result = "Could not format this url, see errors"
    // Step one: Look for protocol
    const protoCycle = regexCycle("^(https?:\/\/)?", url)
    if (protoCycle !== false) {
        let index = protoCycle[0]
        const protocol = protoCycle[1]
        let leftover = protoCycle[2]
        // Step two: Split by / if present
        let indexAndSliceRes = indexAndSlice(leftover, "/")
        if (indexAndSliceRes !== false) {
            if (existValidation(indexAndSliceRes[0]) !== false) {
                if (existValidation(indexAndSliceRes[1]) !== false) {
                    // Step three: Run domain through regex
                } else {
                    errs.push("Url consists of only a domain (warning)")
                }
            } else {
                errs.push("No domain name found")
            }
        } else {
            errs.push("Was unable to group domain name")
        }
    } else {
        errs.push("Incorrect/missing protocol (http(s))")
    }
    
    const protoRegex = new RegExp('^(https?:\/\/)?', 'g')
    const protoRegexResponse = protoRegex.exec(url)
    if (validateRegexResponse(protoRegexResponse) === true) {
        let index = protoRegex.lastIndex
        const protocol = protoRegexResponse[0]
        let leftover = indexAndSlice(url,index,null)[1]
        // Step two: Split by / if present
        let slashIndex = leftover.indexOf("/")
        if (slashIndex > 0) {
            let domainLeftover = indexAndSlice(leftover,slashIndex,null)
            const domain = domainLeftover[0]
            leftover = domainLeftover[1]
            // Step three: Run domain through regex
            const domainRegex = new RegExp('(([a-z\d-])*\.)+[a-z]{2,}', 'g')
            const domainRegexResponse = domainRegex.exec(domain)
            if (validateRegexResponse(domainRegexResponse) === true) {
                // Step four: Split by ? if present

            } else {
                errs.push("Domain name is not valid (RegExp)")
            }
        } else {
            errs.push("Url consists of only domain (warning)")
        }
    } else {
        errs.push("Incorrect/missing protocol (http(s))")
    }
    // Return response and errors
    return {
        response: result,
        errors: errs
    }
}

const regexCycle = (regexRaw, target) => {
    const regex = new RegExp(regexRaw, 'g')
    const res = regex.exec(target)
    if (res !== null && res.length > 0) {
        const index = regex.lastIndex
        const sliceCycleRes = sliceCycle(target, index)
        return [index, res[0], sliceCycleRes[0], sliceCycleRes[1]] 
    } else {
        return false
    }
}

const sliceCycle = (str, idx, startIdx) => {
    const startIdxClone = !startIdx || startIdx === null ? 0 : startIdx
    const a = str.slice(startIdxClone,idx)
    const b = str.slice(idx)
    return [a,b]
}

const existValidation = (obj) => {
    if (obj !== null && obj.length > 0) {
        return true
    } else {
        return false
    }
}

const indexAndSlice = (str, indexMe) => {
    let index = str.indexOf(indexMe)
    if (index > 0) {
        return sliceCycle(str, index)
    } else {
        return false
    }
}