const fs = require('fs')
const path = require('path')

export function file(name, encoding) {
    return fs.readFileSync(path.resolve(__dirname, name), encoding)
}
