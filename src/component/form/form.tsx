import React, { useEffect, useState} from 'react'
import './FormButton.css'
import './FormInput.css'
import uuid from 'uuid'

interface Props {
  handleSubmitInForm: (todo: ToDo) => void;
}

export function Form(props: Props): JSX.Element {
  const initial = '';
  const [value, setValue] = useState<string>(initial);
  const [isError, setError] = useState<boolean>(false);

  useEffect((): void => {
    if (isError) {
      setError(false);
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
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        value={value}
        name="text"
        type="text"
        placeholder="What needs to be done"
        id="text-field"
        autoFocus={true}
        className="FormInput"
      />
      <button
        onClick={handleSubmit}
        className="FormButton"
      >
        +
      </button>
    </form>
  )
}

export class ToDo {
  public readonly text: string;
  public readonly id: string;
  public isComplete: boolean;

  public constructor(text: string, id = uuid(), isComplete = false) {
    this.text = text;
    this.id = id;
    this.isComplete = isComplete;
  }

  public toggleComplete(): void {
    this.isComplete = !this.isComplete;
  }
}
