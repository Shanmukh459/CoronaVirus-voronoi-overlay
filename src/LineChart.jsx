import { line, scaleLog, scaleTime, extent, max } from 'd3'
import React from 'react'
import { XAxis } from './XAxis'
import { YAxis } from './YAxis'

const epsilon = 1

const margin = {
  top: 60,
  right: 20,
  bottom: 60,
  left: 70
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
        <text
          className='title'
          x={innerWidth/2}
          textAnchor='middle'
          y={-20}
        >Global Corona Virus Deaths Over Time By Country</text>
        <XAxis xScale={xScale} innerHeight={innerHeight} />
        <text
          className='axis-label'
          alignmentBaseline='hanging'
          y={innerHeight+25}
          x={innerWidth/2}
        >Time</text>

        <YAxis yScale={yScale} innerWidth={innerWidth} />
        <text
          className='axis-label'
          transform={`translate(-35, ${innerHeight/2}) rotate(-90)`}
        >Cummulative Deaths</text>
        {data.map(countryTimeSeries => (
          <path className='marker-line' d={lineGenerator(countryTimeSeries)} />
        ))}
      </g>
    </svg>
  )
}