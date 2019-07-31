import React, { useState } from 'react'
import { Form } from "./form";

export function List() {
  const [todos, setTodos] = useState([]);

  const add = (todo) => {
    setTodos([todo, ...todos])
  };

  return (
    <div>
      <Form onSubmit={add}/>
      {JSON.stringify(todos)}
    </div>
  )
}