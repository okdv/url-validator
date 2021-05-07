export const urlSettings = {
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
        regex: /((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}||((\d{1,3}\.){3}\d{1,3}))/,
        description: "Can be in a traditional sub.domain.ext format, or in an IPv4 format. This is a unique identifier to an online resource, like website. This is alphanumeric, allows some special characters like -. Must end in an extension, such as .com."
    },
    path: {
        name: "path",
        req: false,
        example: "/folder/file",
        patchable: true,
        default: "/",
        regex: /((:\d+)?(\/[/a-z\d-%_.~+]*))/,
        description: "This refers to the exact location of a resource within a website. Path segments begin with /, are alphanumeric, and allow a range of special characters"
    },
    query: {
        name: "query string",
        req: false,
        example: "?this=that",
        patchable: false,
        default: null,
        regex: /(\?[;&a-z\d%_.~+=-]*)/,
        description: "This assigns variable parameters to a URL. Is started by a ? operation, and contains a set of key=value pairs."
    },
    fragment: {
        name: "fragment",
        req: false,
        example: "#id",
        patchable: false,
        default: null,
        regex: /(#[;&a-z\d%_.~+=-]*)?$/,
        description: "This refers to an internal section or identifier within a document, introduced by a #. Allows a range special characters"
    },
}

export const urlObj = {
    protocol: {
        str: "http",
        fwd: "://"
    },
    domain: {
        sub: null,
        name: null,
        ext: null
    },
    path: {
        folders: null,
        file: null
    },
    query: {
        operation: null,
        pairs: null
    },
    fragment: null
}