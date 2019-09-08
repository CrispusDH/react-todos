import React, { useEffect, useState } from 'react';
import { Form, ToDo } from './form/form';
import { Item } from './item';

export enum FilterOptions {
  All,
  Active,
  Completed
}

export const List: React.FC = (): JSX.Element => {
  const initialToDo = (): ToDo[] => {
    const raw: [] = JSON.parse(`${window.localStorage.getItem('todos')}`);
    const array = raw.map(({ text, id, isComplete }): ToDo => new ToDo(text, id, isComplete));
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
    const list = todos.map((todo) => {
      return Item({ todo, filter, handleDeleteToDo, handleLineThrough})
    });
    return <ul>{list}</ul>;
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
      <label>todos left: {left()}</label>
      <div>
        <button onClick={(): void => setFilter(FilterOptions.All)}>all</button>
        <button onClick={(): void => setFilter(FilterOptions.Active)}>active</button>
        <button onClick={(): void => setFilter(FilterOptions.Completed)}>completed</button>
      </div>
      <div>
        <button
          onClick={(): void => handleRemoveCompleted()}>remove all completed todos
        </button>
      </div>
    </div>
  )
}
