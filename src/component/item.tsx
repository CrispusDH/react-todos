import React from 'react';
import { ToDo } from './form';
import { FilterOptions } from './list';
import { IconButton, ListItemText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

interface Props {
  todo: ToDo;
  filter: FilterOptions;
  handleDeleteToDo: (id: string) => void;
  handleLineThrough: () => void;
}

export function Item(props: Props): JSX.Element {
  return (
    <ListItemText
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
      <IconButton
        onClick={(event): void => {
          event.stopPropagation();
          props.handleDeleteToDo(props.todo.id)
        }}>
        <DeleteIcon fontSize='small'/>
      </IconButton>
    </ListItemText>
  )
}
