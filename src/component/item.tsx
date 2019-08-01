import * as React from 'react'
import { ToDo } from "./form";

export function Item(todo: ToDo) {
  return <li
    key={todo.id}
    onClick={() => todo.toggleComplete()}
  >{JSON.stringify(todo.isComplete)}</li>
}
