const express = require("express");
const {
  getAllItems,
  getItemById,
  creatItem,
  updateItem,
  deleteItem,
} = require("../Controllers/ItemController");
const itemRoutes = express.Router();

itemRoutes.get("/item/:id", getItemById);
itemRoutes.get("/items", getAllItems);
itemRoutes.post("/items", creatItem);
itemRoutes.put("/item/:id", updateItem);
itemRoutes.delete("/item/:id", deleteItem);

module.exports = itemRoutes;
