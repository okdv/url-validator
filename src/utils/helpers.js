export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

export const notNull = (item) => item && item !== null ? true : false

export const smashObj = (obj) => {
    let res = ""
    Object.keys(obj).forEach(key => {
        const str = obj[key]
        res += str !== null ? str : ""
    })
    return res
}

export const splitArrByKeyword = (arr,keyword) => {
    let a = [], b = []
    arr.forEach(item => {
        item.toLowerCase().includes(keyword) ?
            a.push(item) : b.push(item)
    })
    return [a,b]
}

export const copy = (txt) => {
    navigator.clipboard.writeText(txt).then(function() {
        console.log("copied")
        return true
    }, function() {
        console.log("failed to copy")
        return false
    })
}

export const validResponse = (obj) => notNull(obj.protocol) && notNull(obj.domain) && notNull(obj.path) ? true : false