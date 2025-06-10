import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  const API_URL = "http://localhost:4000/items";

  //1. Add useEffect hook to display items on load
  useEffect(() => {
    //console.log("component loaded") - use at first to check if it is working 
     fetch(API_URL)
      .then(r => {
        if (r.ok) {
          return r.json()
        } else {
          console.log("fetch request failed")
        }
      })
      .then(items => setItems(items))
      .catch(error => console.log(error))
  }, []);

  //3. add a handleAddItem function to shopping list so that the ItemForm component can send the new item up to the Shopping List
  
  function handleAddItem(newItem) {
    //console.log("In ShoppingList:", newItem);
    //6. update to update state
    setItems([...items, newItem]);
  }


  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
       {/* 4.  added the onAddItem prop! */}
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
