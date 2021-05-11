const mongoose = require('mongoose')
const {model, Schema} = mongoose

let categorySchema = Schema({
    name: {
        type: String,
        minlength: [3, 'Panjang Nama Kategori Minimal 3 Karakter'],
        maxlength: [20,'Panjang Nama Kategori Minimal 3 Karakter'],
        required: [true, 'Nama Kategori Tidak Boleh Kosong']
    }
})

module.exports = model('Category', categorySchema)