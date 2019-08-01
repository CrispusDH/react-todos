import * as React from 'react'
import { useState } from 'react'
import uuid from 'uuid'

interface Props {
  onSubmit: (todo: ToDo) => void
}

export function Form(props: Props) {
  const initial = '';
  const [value, setValue] = useState(initial);

  const onChange = (event: any) => {
    setValue(event.target.value)
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    props.onSubmit(new ToDo(value));
    setValue(initial);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={onChange}
        value={value}
        type="text"
        placeholder="What needs to be done"
        id="form"
        autoFocus={true}
      />
      <button onClick={onSubmit}>
        add todo
      </button>
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
