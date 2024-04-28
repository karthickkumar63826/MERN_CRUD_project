import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

const Item = () => {
  const initialValue = {
    name: "",
    price: 0,
    quantity: 0,
  };
  const [products, setProducts] = useState(initialValue);
  const [items, setItems] = useState([]);
  const [isEditable, setIsEditable] = useState(false);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/items/items`);
      const data = await response.data.items;
      console.log(data);
      setItems(data);
      console.log("check the item", items);
    } catch (error) {
      console.log(error);
    }
  };

  const addItems = async () => {
    const input = products;
    try {
      await axios.post(`http://localhost:8080/items/items`, input);
      await fetchItems();
      setProducts(initialValue);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `http://localhost:8080/items/item/${id}`
      );
      console.log(response);
      await fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (id) => {
    setIsEditable(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/items/item/${id}`
      );
      console.log(response);
      setProducts(response.data.item);
    } catch (err) {
      console.log(err);
    }
  };

  const updateItem = async (id) => {
    const input = products;
    console.log(input);
    try {
      const response = await axios.put(
        `http://localhost:8080/items/item/${id}`,
        input
      );
      console.log(response.status);
      await fetchItems();
      setProducts(initialValue);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducts((prevProducts) => ({
      ...prevProducts,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEditable) addItems();
    else updateItem(products._id);
    setIsEditable(false);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        gap: "30px",
        alignItems: "center",
      }}
    >
      <h1>ITEM's CRUD operations</h1>
      <div style={{ display: "flex" }}>
        <div style={{ width: "600px" }}>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3">
              <Form.Label> Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item name"
                name="name"
                value={products.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item price"
                name="price"
                value={products.price}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> Quantity</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter no items"
                name="quantity"
                value={products.quantity}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>{" "}
            <Button variant="danger" onClick={() => setProducts(initialValue)}>
              Reset
            </Button>
          </Form>
        </div>
        <div style={{ marginLeft: "100px", textAlign: "center" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th colSpan={2}>Functions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(items) &&
                items.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        onClick={() => handleEdit(item._id)}
                      >
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="outline-danger"
                        onClick={() => deleteItem(item._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Item;
