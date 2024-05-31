import React from 'react'
import { LineChart } from './LineChart'

const width = window.innerWidth
const height = window.innerHeight

function App() {
  return (
    <LineChart width={width} height={height} />
  )
}

export default App