import React, { useState } from "react";

function ItemForm({ onAddItem }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  function handleSubmit(e) {
    e.preventDefault();

    const itemData = {
      name,
      category,
      isInCart: false,
    };

    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    })
      .then((r) => {
        if (!r.ok) {
          throw new Error("fetch request failed");
        }
        return r.json();
      })
      .then((newItem) => {
        console.log("New item added:", newItem);
        if (onAddItem) onAddItem(newItem);
        setName("");
        setCategory("Produce");
      })
      .catch((error) => console.log(error));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Bakery">Bakery</option>
          <option value="Meat">Meat</option>
        </select>
      </label>

      <button type="submit">Add Item</button>
    </form>
  );
}

export default ItemForm;