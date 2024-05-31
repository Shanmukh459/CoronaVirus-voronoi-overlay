import React from 'react'
import { LineChart } from './LineChart'
import { useData } from './useData'

const width = window.innerWidth
const height = window.innerHeight

function App() {
  const data = useData()

  if(!data) {
    return <h1>Loading...</h1>
  }
  return (
    <LineChart data={data} width={width} height={height} />
  )
}

export default App