import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

useEffect(()=>{
fetch(`http://localhost:4000/items`)
.then(response=>{
  if(!response.ok){throw new Error("failed to fetch new items")}
  return response.json()
})
.then(items=>setItems(items))
.catch(err=>console.log(err))
},[])
  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });
  function HandleNewItem(newItem){
    setItems(prevItems =>[...prevItems,newItem])
  }

  return (
    <div className="ShoppingList">
      <ItemForm  onAddItem={HandleNewItem}/>
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
