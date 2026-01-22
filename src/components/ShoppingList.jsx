import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(()=>{
    // console.log("components loaded");
    // fetch("http://localhost:4000/items")
      fetch("https://fakestoreapi.com/products")
      .then(response=>{
        if(response.ok){
          return response.json()
        }else{
          console.log("fetching request failed");
          
        }
      })
      .then(items=>
        // console.log(items)
        setItems(items)
        
      )
      .catch(error=>
        console.log(error)
        
      )
    
  },[])

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm />
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
