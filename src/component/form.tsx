import React from 'react'
import { useState } from 'react'
import uuid from 'uuid'
import { TextField, Fab } from '@material-ui/core'

interface Props {
  handleSubmitInForm: (todo: ToDo) => void
}

export function Form(props: Props) {
  const initial = '';
  const [value, setValue] = useState<string>(initial);
  const [isError, setError] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>(initial);

  const handleChange = (event: any) => {
    if (isError) {
      setError(false);
      setHelperText(initial);
    }
    setValue(event.target.value)
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (isValid()) {
      props.handleSubmitInForm(new ToDo(value));
      setValue(initial);
    } else {
      setError(true);
      setHelperText('ToDo should not be empty');
    }
  };

  const isValid = () => {
    return value.trim().length !== 0
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        onChange={handleChange}
        value={value}
        type="text"
        placeholder="What needs to be done"
        id="text-field"
        autoFocus={true}
        error={isError}
        helperText={helperText}
      />
      <Fab
        onClick={handleSubmit}
        color='primary'
        variant='round'
        size='small'
        style={{
          marginLeft: 15
        }}
      >
        +
      </Fab>
    </form>
  )
}

export class ToDo {
  public readonly text: string;
  public readonly id: string;
  public isComplete: boolean;

  constructor(text: string) {
    this.text = text;
    this.id = uuid();
    this.isComplete = false;
  }

  toggleComplete() {
    this.isComplete = !this.isComplete;
  }
}
