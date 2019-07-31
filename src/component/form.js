import React, { useState } from 'react'
import uuid from 'uuid'

export function Form({add}) {
  const initial = '';
  const [value, setValue] = useState(initial);

  const change = (event) => {
    setValue(event.target.value)
  };

  const submit = (event) => {
    event.preventDefault();
    add(new ToDo(value));
    setValue(initial);
  };

  return (
    <form onSubmit={submit}>
      <input
        onChange={change}
        value={value}
        type="text"
        placeholder="What needs to be done"
        id="form"
        autoFocus={true}
      />
      <button onClick={submit}>
        add todo
      </button>
    </form>
  )
}

export class ToDo {
  constructor(text) {
    this.text = text;
    this.id = uuid();
    this.isComplete = false;
  }
}
