import { List } from './component/list'
import { Headline } from './component/headline';
import React from 'react'

export function Root() {
  return (
    <div>
      <Headline value="TODOS"/>
      <List />
    </div>
  )
}
