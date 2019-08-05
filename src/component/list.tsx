import React, { useEffect, useState } from 'react';
import { Form, ToDo } from './form';
import { Item } from './item';
import { List as MaterialList, ButtonGroup, Button, InputLabel } from "@material-ui/core";

export enum FilterOptions {
  All,
  Active,
  Completed
}

export function List() {
  const initialToDo = () => {
    const array: ToDo[] = JSON.parse(`${localStorage.getItem('todos')}`);
    return array || [];
  };

  const [todos, setToDos] = useState<ToDo[]>(initialToDo());
  const [filter, setFilter] = useState<FilterOptions>(FilterOptions.All);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

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
    return <MaterialList>{list}</MaterialList>;
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
      <InputLabel>todos left: {left()}</InputLabel>
      <ButtonGroup size='small'>
        <Button onClick={() => setFilter(FilterOptions.All)}>all</Button>
        <Button onClick={() => setFilter(FilterOptions.Active)}>active</Button>
        <Button onClick={() => setFilter(FilterOptions.Completed)}>completed</Button>
      </ButtonGroup>
      <div>
        <Button
          variant="outlined"
          onClick={() => handleRemoveCompleted()}>remove all completed todos
        </Button>
      </div>
    </div>
  )
}
