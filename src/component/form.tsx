import React, { useEffect, useState} from 'react'
import uuid from 'uuid'
import { TextField, Fab } from '@material-ui/core'

export class ToDo {
  public readonly text: string;
  public readonly id: string;
  public isComplete: boolean;

  public constructor(text: string) {
    this.text = text;
    this.id = uuid();
    this.isComplete = false;
  }

  public toggleComplete(): void {
    this.isComplete = !this.isComplete;
  }
}

interface Props {
  handleSubmitInForm: (todo: ToDo) => void;
}

export function Form(props: Props): JSX.Element {
  const initial = '';
  const [value, setValue] = useState<string>(initial);
  const [isError, setError] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>(initial);

  useEffect((): void => {
    if (isError) {
      setError(false);
      setHelperText(initial)
    }
  }, [value]);

  const handleChange = (event: any): void => {
    setValue(event.currentTarget.value);
  };

  const isValid = (): boolean => {
    return value.trim().length !== 0
  };

  const handleSubmit = (event: any): void => {
    event.preventDefault();
    if (isValid()) {
      props.handleSubmitInForm(new ToDo(value));
      setValue(initial);
    } else {
      setError(true);
      setHelperText('ToDo should not be empty')
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        onChange={handleChange}
        value={value}
        name="text"
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
