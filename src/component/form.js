import React, { useState } from 'react'
import uuid from 'uuid'

export function Form() {
  const [value, setValue] = useState('');

  const change = (event) => {
    setValue(event.target.value)
  };

  const submit = (event) => {
    event.preventDefault();
    return {
      id: uuid(),
      text: value,
      isComplete: false
    }
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
    </form>
  )
}
