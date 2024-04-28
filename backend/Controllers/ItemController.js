const { mongoose } = require("mongoose");
const Item = require("../Models/itemSchema");

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(201).json({ items });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getItemById = async (req, res) => {
  const itemId = req.params.id;
  try {
    const item = await Item.findById({ _id: itemId });
    if (!item) {
      res.status(404).send("Item Not found");
    }
    res.status(201).json({ item });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const creatItem = async (req, res) => {
  const item = req.body;
  try {
    await Item.create(item);
    console.log("Item added successfully");
    res.status(201).send("Item added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const updateItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const updateItem = req.body;
    const result = await Item.updateOne({ _id: itemId }, { $set: updateItem });
    if (result.nModified === 0) {
      res.status(404).send("Item not found ");
    }
    res.status(201).send("updated successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).send("Item not found");
    }
    await Item.deleteOne({ _id: itemId });
    res.status(201).send("Item deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {
  getAllItems,
  getItemById,
  creatItem,
  updateItem,
  deleteItem,
};
