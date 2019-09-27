import React from 'react';
import { ToDo } from '../Form';
import { FilterOptions } from '../List';

export const Item: React.FC<Props> = (props: Props): JSX.Element => {
  const handleClick = (): void => {
    props.todo.toggleComplete();
    props.handleLineThrough();
  };

  // TODO: read CSS in JS
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "start",
        textDecorationLine: props.todo.isComplete && props.filter !== FilterOptions.Completed ? 'line-through' : ''
      }}
      key={props.todo.id}
      onClick={handleClick}
    >{props.todo.text}
      <Button todo={props.todo} handleDeleteToDo={props.handleDeleteToDo}/>
    </li>
  )
};

interface Props {
  todo: ToDo;
  filter: FilterOptions;
  handleDeleteToDo: (id: string) => void;
  handleLineThrough: () => void;
}

interface ButtonProps {
  todo: ToDo;
  handleDeleteToDo: (id: string) => void;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps): JSX.Element => {
  type clickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

  const handleClick = (event: clickEvent): void => {
    event.stopPropagation();
    props.handleDeleteToDo(props.todo.id)
  };

  return (
    <button
      onClick={handleClick}>
      X
    </button>
  )
};
