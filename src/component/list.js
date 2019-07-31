import React, { useState } from 'react'
import { Form } from "./form";
import { Item } from "./item";

export function List() {
  const [todos, setTodos] = useState([]);

  const add = (todo) => {
    setTodos([todo, ...todos]);
  };

  const show = () => {
    const list = todos.map((todo) => {
      return Item(todo)
    });
    return <ul>{list}</ul>;
  };

  return (
    <div>
      <Form add={add}/>
      {show()}
    </div>
  )
}
