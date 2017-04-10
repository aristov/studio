import { DocumentAssembler, ElementAssembler } from 'dommodule'

const CSV_ITEM_SEPARATOR = '\n'
const CSV_VALUE_SEPARATOR = ','

export class CSVDocument extends DocumentAssembler {
    init(init) {
        this.node.instance = this
        super.init(init)
    }
    set head(head) {
        this.documentElement.setAttribute('head', head.join(CSV_VALUE_SEPARATOR))
    }
    get head() {
        return this.documentElement.getAttribute('head').split(CSV_VALUE_SEPARATOR)
    }
    set data(data) {
        const lines = data.trim().split(CSV_ITEM_SEPARATOR)
        const handler = item => item.trim().split(CSV_VALUE_SEPARATOR)
        const items = lines.map(handler)
        const trim = value => value.trim()
        items.map((item, i) => this[i? 'item' : 'head'] = item.map(trim))
    }
    set item(item) {
        const head = this.head
        const handler = (value, i) => ({ name : head[i], value })
        const filter = ({ value }) => value
        const assembler = this.constructor.itemAssembler
        new assembler({
            attributes : item.map(handler).filter(filter),
            parentNode : this.documentElement
        })
    }
    static get itemAssembler() {
        return CSVElement
    }
}

export class CSVElement extends ElementAssembler {
    get document() {
        return this.node.ownerDocument.instance
    }
    set attributes(attributes) {
        if(Array.isArray(attributes)) {
            attributes.forEach(({ namespaceURI, name, value }) => {
                if(namespaceURI) this.node.setAttributeNS(namespaceURI, name, value)
                else this.node.setAttribute(name, value)
            })
        }
        else super.attributes = attributes
    }
    get attributes() {
        return super.attributes
    }
}
