import React from 'react'

interface Props {
  value: string;
}

export function Headline(props: Props) {
  return (
    <h1>
      {props.value}
    </h1>
  )
}
