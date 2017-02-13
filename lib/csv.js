import { document, element } from 'dommodule'

function storage(children) {
    return document({
        qualifiedName : 'storage',
        documentElement : { children }
    })
}

function unit(attributes) {
    return element({ qualifiedName : 'unit', attributes })
}

/**
 *
 * @param {String} csv
 * @returns {Array}
 */
export function toArray(csv) {
    const data = csv.split('\n').map(line => line.split(','))
    const attrNames = data[0].map(name => name.trim())
    return data.slice(1).map(item => {
        return item.reduce((res, attr, i) => {
            const value = attr.trim()
            if(value) res[attrNames[i]] = value
            return res
        }, {})
    })
}

/**
 *
 * @param csv
 * @returns {*}
 */
export function toXMLDOM(csv) {
    const data = csv.split('\n').map(line => {
        return line.split(',')
    })
    const attrNames = data[0].map(name => name.trim())
    const result = document({
        qualifiedName : 'csvdata',
        documentElement : {
            children : data.slice(1).map(item => {
                return element({
                    qualifiedName : 'csvrow',
                    attributes : item.reduce((res, attr, i) => {
                        const value = attr.trim()
                        if(value) {
                            const name = attrNames[i]
                            res[name] = value
                        }
                        return res
                    }, {})
                })
            })
        }
    })
    return result.node
}
