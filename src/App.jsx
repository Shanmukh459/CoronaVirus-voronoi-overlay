import React from 'react'
import { LineChart } from './LineChart'
import { useData } from './useData'

const width = window.innerWidth
const height = window.innerHeight

function App() {
  const data = useData()

  console.log(data)
  return (
    <LineChart width={width} height={height} />
  )
}

export default App