import { line, scaleLog, scaleTime, extent, max } from 'd3'
import React from 'react'

const epsilon = 1
export const LineChart = ({data, width, height}) => {

  console.log(data)
  const allData = data.flat(Infinity)

  const xValue = d => d.date
  const xScale = scaleTime()
    .domain(extent(allData, xValue))
    .range([0, width])

  const yValue = d => d.totalDeaths
  const yScale = scaleLog()
    .domain([epsilon, max(allData, yValue)])
    .range([height, 0])

  const lineGenerator = line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(epsilon+yValue(d)))
  
  return (
    <svg width={width} height={height}>
      {data.map(countryTimeSeries => (
        <path className='marker-line' d={lineGenerator(countryTimeSeries)} />
      ))}
    </svg>
  )
}