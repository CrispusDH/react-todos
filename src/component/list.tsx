import React, { useState } from 'react';
import { Form, ToDo } from './form';
import { Item } from './item';

export function List() {
  const [todos, setToDos] = useState<ToDo[]>([]);
  const [filter, setFilter] = useState<FilterOptions>(FilterOptions.All);

  const onSubmit = (todo: ToDo) => {
    setToDos([todo, ...todos]);
  };

  const onClick = () => {
    setToDos([...todos]);
  };

  const show = (todos: ToDo[]) => {
    const list = todos.map((todo) => {
      return Item({ todo, filter, handleDeleteToDo})
    });
    return <ul onClick={onClick}>{list}</ul>;
  };

  const left = () => {
    return todos.filter((todo) => !todo.isComplete).length;
  };

  const filtered = () => {
    let array: ToDo[] = [];
    switch (filter) {
      case FilterOptions.All: {
        array = todos;
        break;
      }
      case FilterOptions.Active: {
        array = todos.filter((todo) => !todo.isComplete);
        break;
      }
      case FilterOptions.Completed: {
        array = todos.filter((todo) => todo.isComplete);
        break;
      }
    }
    return array;
  };

  const handleDeleteToDo = (id: string) => {
    setToDos(todos.filter((todo) => {
      return todo.id !== id;
    }));
  };

  return (
    <div>
      <Form onSubmit={onSubmit}/>
      {show(filtered())}
      <label>todos left: {left()}</label>
      <div>
        <button onClick={() => setFilter(FilterOptions.All)}>all</button>
        <button onClick={() => setFilter(FilterOptions.Active)}>active</button>
        <button onClick={() => setFilter(FilterOptions.Completed)}>completed</button>
      </div>
    </div>
  )
}

export enum FilterOptions {
  All,
  Active,
  Completed
}
