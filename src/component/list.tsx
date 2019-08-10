import React, { useEffect, useState } from 'react';
import { Form, ToDo } from './form';
import { Item } from './item';
import { List as MaterialList, ButtonGroup, Button, InputLabel } from "@material-ui/core";

export enum FilterOptions {
  All,
  Active,
  Completed
}

export function List(): JSX.Element {
  const initialToDo = (): ToDo[] => {
    const array: ToDo[] = JSON.parse(`${window.localStorage.getItem('todos')}`);
    return array || [];
  };

  const [todos, setToDos] = useState<ToDo[]>(initialToDo());
  const [filter, setFilter] = useState<FilterOptions>(FilterOptions.All);

  useEffect((): void => {
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleLineThrough = (): void => {
    setToDos([...todos]);
  };

  const handleDeleteToDo = (id: string): void => {
    setToDos(todos.filter((todo): boolean => {
      return todo.id !== id;
    }));
  };

  const show = (todos: ToDo[]): JSX.Element => {
    const list = todos.map((todo): JSX.Element => {
      return Item({ todo, filter, handleDeleteToDo, handleLineThrough})
    });
    return <MaterialList>{list}</MaterialList>;
  };

  const left = (): number => {
    return todos.filter((todo): boolean => !todo.isComplete).length;
  };

  const filtered = (): ToDo[] => {
    switch (filter) {
      case FilterOptions.All: {
        return todos;
      }
      case FilterOptions.Active: {
        return todos.filter((todo): boolean => !todo.isComplete);
      }
      case FilterOptions.Completed: {
        return todos.filter((todo): boolean => todo.isComplete);
      }
    }
  };

  const handleRemoveCompleted = (): void => {
    setToDos(todos.filter((todo): boolean => !todo.isComplete));
  };

  const handleSubmitInForm = (todo: ToDo): void => {
    setToDos([todo, ...todos]);
  };

  return (
    <div>
      <Form handleSubmitInForm={handleSubmitInForm}/>
      {show(filtered())}
      <InputLabel>todos left: {left()}</InputLabel>
      <ButtonGroup size='small'>
        <Button onClick={(): void => setFilter(FilterOptions.All)}>all</Button>
        <Button onClick={(): void => setFilter(FilterOptions.Active)}>active</Button>
        <Button onClick={(): void => setFilter(FilterOptions.Completed)}>completed</Button>
      </ButtonGroup>
      <div>
        <Button
          variant="outlined"
          onClick={(): void => handleRemoveCompleted()}>remove all completed todos
        </Button>
      </div>
    </div>
  )
}
