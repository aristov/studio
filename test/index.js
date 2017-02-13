import { toXMLDOM } from '../lib/csv'

const document = window.document

window.fetch('data/equipment.csv')
    .then(res => res.text())
    .then(csv => {
        return toXMLDOM(csv)
    })
    .then(doc => {
        document.documentElement.replaceWith(doc.documentElement)
    })
