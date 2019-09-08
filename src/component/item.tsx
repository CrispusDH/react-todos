import React from 'react';
import { ToDo } from './form/form';
import { FilterOptions } from './list';

interface Props {
  todo: ToDo;
  filter: FilterOptions;
  handleDeleteToDo: (id: string) => void;
  handleLineThrough: () => void;
}

export const Item: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "start",
        textDecorationLine: props.todo.isComplete && props.filter !== FilterOptions.Completed ? 'line-through' : ''
      }}
      key={props.todo.id}
      onClick={(): void => {
        props.todo.toggleComplete();
        props.handleLineThrough();
      }}
    >{props.todo.text}
      <button
        onClick={(event: any): void => {
          event.stopPropagation();
          props.handleDeleteToDo(props.todo.id)
        }}>
        X
      </button>
    </li>
  )
};
