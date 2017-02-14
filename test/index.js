import { CSVDocument } from '../lib/csvassembler'

const root = window.document.documentElement

window.fetch('data/equipment.csv')
    .then(res => res.text())
    .then(data => new CSVDocument({ data }))
    .then(doc => {
        root.replaceWith(doc.documentElement)
    })
