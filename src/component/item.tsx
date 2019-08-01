import React from 'react';
import { ToDo } from './form';
import { FilterOptions } from './list';

interface Props {
  todo: ToDo,
  filter: FilterOptions,
  handleDeleteToDo: (id: string) => void
}

export function Item(props: Props) {
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "start",
        textDecorationLine: props.todo.isComplete && props.filter !== FilterOptions.Completed ? 'line-through' : ''
      }}
      key={props.todo.id}
      onClick={() => props.todo.toggleComplete()}
    >{props.todo.text}
    <button onClick={(event) => {
      event.stopPropagation();
      props.handleDeleteToDo(props.todo.id)
    }}>x</button>
    </li>
  )
}
