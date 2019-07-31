import React from 'react';
import { List } from './component/list'
import { Headline } from "./component/headline";

export function Root() {
  return (
    <div>
      <Headline value={"TODOS"}/>
      <List />
    </div>
  )
}