import React, { useState } from 'react';
import { Form, ToDo } from './form';
import { Item } from './item';

export enum FilterOptions {
  All,
  Active,
  Completed
}

export function List() {
  const [todos, setToDos] = useState<ToDo[]>([]);
  const [filter, setFilter] = useState<FilterOptions>(FilterOptions.All);

  const handleLineThrough = () => {
    setToDos([...todos]);
  };

  const handleDeleteToDo = (id: string) => {
    setToDos(todos.filter((todo) => {
      return todo.id !== id;
    }));
  };

  const show = (todos: ToDo[]) => {
    const list = todos.map((todo) => {
      return Item({ todo, filter, handleDeleteToDo, handleLineThrough})
    });
    return <ul>{list}</ul>;
  };

  const left = () => {
    return todos.filter((todo) => !todo.isComplete).length;
  };

  const filtered = () => {
    switch (filter) {
      case FilterOptions.All: {
        return todos;
      }
      case FilterOptions.Active: {
        return todos.filter((todo) => !todo.isComplete);
      }
      case FilterOptions.Completed: {
        return todos.filter((todo) => todo.isComplete);
      }
    }
  };

  const handleRemoveCompleted = () => {
    setToDos(todos.filter((todo) => !todo.isComplete));
  };

  const handleSubmitInForm = (todo: ToDo) => {
    setToDos([todo, ...todos]);
  };

  return (
    <div>
      <Form handleSubmitInForm={handleSubmitInForm}/>
      {show(filtered())}
      <label>todos left: {left()}</label>
      <div>
        <button onClick={() => setFilter(FilterOptions.All)}>all</button>
        <button onClick={() => setFilter(FilterOptions.Active)}>active</button>
        <button onClick={() => setFilter(FilterOptions.Completed)}>completed</button>
      </div>
      <div>
        <button onClick={() => handleRemoveCompleted()}>remove all completed todos</button>
      </div>
    </div>
  )
}
