const Item = require('../models/Item');


async function getAll(limit) {
    // .limit(3)
    if (limit) {
        return Item.find({}).limit(limit);
    }
    return Item.find({});
}

async function getByUserId(userId) {
    return Item.find({ _ownerId: userId });
}

async function getById(id) {
    return Item.findById(id);
}

async function create(item) {
    return Item.create(item);
}

async function update(id, item) {
    const existing = await Item.findById(id);

    existing.title = item.title;
    existing.description = item.description;
    existing.price = item.price;
    existing.tel = item.tel;
    existing.img = item.img;
    existing.city = item.city;

    return existing.save();
}

async function deleteById(id) {
    return Item.findByIdAndDelete(id);
}


module.exports = {
    getAll,
    getByUserId,
    getById,
    create,
    update,
    deleteById
};