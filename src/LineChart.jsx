import { line, scaleLog, scaleTime, extent, max } from 'd3'
import React from 'react'
import { XAxis } from './XAxis'
import { YAxis } from './YAxis'


const epsilon = 1

const margin = {
  top: 20,
  right: 20,
  bottom: 40,
  left: 60
}
export const LineChart = ({data, width, height}) => {
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const allData = data.flat(Infinity)

  const xValue = d => d.date
  const xScale = scaleTime()
    .domain(extent(allData, xValue))
    .range([0, innerWidth])

  const yValue = d => d.totalDeaths
  const yScale = scaleLog()
    .domain([epsilon, max(allData, yValue)])
    .range([innerHeight, 0])

  const lineGenerator = line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(epsilon+yValue(d)))
  
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <XAxis xScale={xScale} innerHeight={innerHeight} />
        <YAxis yScale={yScale} innerWidth={innerWidth} />
        {data.map(countryTimeSeries => (
          <path className='marker-line' d={lineGenerator(countryTimeSeries)} />
        ))}
      </g>
    </svg>
  )
}