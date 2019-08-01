import * as React from 'react';
import {useEffect, useState} from 'react'
import { Form, ToDo } from './form';
import { Item } from './item';

export function List() {
  const [todos, setTodos] = useState<ToDo[]>([]);

  const onSubmit = (todo: ToDo) => {
    setTodos([todo, ...todos]);
  };

  const onClick = () => {
    setTodos([...todos]);
  };

  const show = () => {
    const list = todos.map((todo) => {
      return Item(todo)
    });
    return <ul onClick={onClick}>{list}</ul>;
  };

  return (
    <div>
      <Form onSubmit={onSubmit}/>
      {show()}
    </div>
  )
}
