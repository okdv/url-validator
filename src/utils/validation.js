import {objToArr} from './helpers'
import {urlObj} from '../assets/data'

const throwErr = (obj) => obj

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

// Acts as handler
export const validation = (url) => {
    let errs = []
    // Decode all HTML entities
    const decodeEntitiesRes = decodeEntities(url)
    const decoded = decodeEntitiesRes[0]
    decodeEntitiesRes[1].map(err => errs.push(err))
    // Split URL via loop iteration
}