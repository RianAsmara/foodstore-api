const mongoose = require('mongoose')

const {model, Schema} = mongoose

const tagSchema = Schema({
    name: {
        type: String,
        minlength: [3, 'Panjang Nama Tags Minimal 3 Karakter'],
        maxlength: [20,'Panjang Nama Tags Minimal 3 Karakter'],
        required: [true, 'Nama Tags Tidak Boleh Kosong']
    }
})

module.exports = model('Tag', tagSchema)