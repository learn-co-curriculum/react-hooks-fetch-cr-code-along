import React, { useState } from "react";

function ItemForm(onAddItem) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");
function HandleSubmit(e){
  e.preventDefault()
  const itemData ={
    name: name,
    category:category,
    isInCart: false
  }
  fetch(`http://localhost:4000/items`,{
    method:"POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(itemData)
  })
  .then(response=>{
if(!response.ok){throw new Error("failed to add item ")}
return response.json()
  })
  .then(item => onAddItem(item))
  .catch(err =>console.log(err))

}
  return (
    <form className="NewItem" onSubmit={HandleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
