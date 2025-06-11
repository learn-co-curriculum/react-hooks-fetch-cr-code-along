import React from "react";

function Item({ item, onUpdateItem }) {
  //1,update: Add function to handle button click
  function handleAddToCartClick() {
    //3. and add fetch console.log("clicked item:", item);
    fetch(`http://localhost:4000/items${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      }),
    })
      .then(r => {
        if (r.ok) {
          return r.json()
        } else {
          console.log("failed to update item")
        }
      })
      //6,update: add prop and replace conosole.log with onUpdateItem
      .then(updatedItem => onUpdateItem(updatedItem))
      .catch(error => console.log(error))
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      {/*2,update: Add the onClick listener */}
      <button className={item.isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}>
        {item.isInCart ? "Remove From" : "Add to"}
        Cart
      </button>
      <button className="remove">Delete</button>
    </li>
  );
}

export default Item;
