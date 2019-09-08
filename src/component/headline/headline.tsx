import React from 'react';
import './Headline.css';

interface Props {
  value: string;
}

export const Headline: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <h1
      className="Headline"
    >
      {props.value}
    </h1>
  )
};
