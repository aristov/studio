const fs = require('fs')
const path = require('path')
const csv = fs.readFileSync(path.resolve(__dirname, 'assets.csv'), 'utf-8')

console.log(csv.split('\n').map(line => {
    return line.split(',')
}))
