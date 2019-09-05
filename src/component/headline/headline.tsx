import React from 'react';
import './Headline.css';

interface Props {
  value: string;
}

export function Headline(props: Props): JSX.Element {
  return (
    <h1
      className="Headline"
    >
      {props.value}
    </h1>
  )
}
