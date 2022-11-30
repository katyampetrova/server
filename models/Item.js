const { Schema, model, Types: { ObjectId } } = require('mongoose');


const itemSchema = new Schema({
    title: { type: String, required: true, minlength: [3, 'Make must be at least 3 characters long'] },
    description: { type: String, required: true, minlength: [10, 'Description must be at least 10 characters long'] },
    price: { type: Number, required: true, min: [0.01, 'Price must be a positive number'] },
    img: { type: String, required: [true, 'Image URL is required'] },
    tel: { type: Number, required: [true, 'Contact phone number is required'] },
    _ownerId: { type: ObjectId, ref: 'User', required: true }
});

const Item = model('Item', itemSchema);

module.exports = Item;