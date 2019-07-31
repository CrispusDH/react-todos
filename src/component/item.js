import React from 'react';

export function Item(todo) {
  return <li key={todo.id}>{todo.text}</li>
}
