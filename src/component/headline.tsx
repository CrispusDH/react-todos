import * as React from 'react'

interface Props {
  value: string;
}

export function Headline({value}: Props) {
  return (
    <h1>
      {value}
    </h1>
  )
}
