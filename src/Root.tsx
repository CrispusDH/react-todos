import React from 'react'
import { List } from './components/List'
import { Headline } from './components/Headline';

export function Root(): JSX.Element {
  return (
    <div>
      <Headline value="TODOS"/>
      <List />
    </div>
  )
}
