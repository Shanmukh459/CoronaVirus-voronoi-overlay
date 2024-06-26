import { line, scaleLog, scaleTime, extent, max, timeFormat } from "d3"
import React, { useCallback, useMemo, useState } from "react"
import { XAxis } from "./XAxis"
import { YAxis } from "./YAxis"
import { VoronoiOverlay } from "./VoronoiOverlay"

const epsilon = 1

const margin = {
  top: 60,
  right: 20,
  bottom: 60,
  left: 70,
}

const xValue = (d) => d.date
const yValue = (d) => d.totalDeaths

const formatDate = timeFormat("%b %d %Y")

const ToolTip = ({ activeRow, className }) => (
  <text className={className} textAnchor="end" y={-12}>
    {activeRow.countryName}: {activeRow.totalDeaths} death
    {activeRow.totalDeaths > 1 && "s"} as of {formatDate(activeRow.date)}
  </text>
)

export const LineChart = ({ data, width, height }) => {
  const [activeRow, setActiveRow] = useState()

  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const allData = useMemo(() => data.flat(Infinity), [data])

  const xScale = useMemo(
    () => scaleTime()
      .domain(extent(allData, xValue))
      .range([0, innerWidth]),
    [allData, xValue, innerWidth]
  )

  const yScale = useMemo(
    () =>
      scaleLog()
        .domain([epsilon, max(allData, yValue)])
        .range([innerHeight, 0]),
    [epsilon, allData, yValue, innerHeight]
  )

  const lineGenerator = useMemo(
    () =>
      line()
        .x((d) => xScale(xValue(d)))
        .y((d) => yScale(epsilon + yValue(d))),
    [xScale, xValue, yScale, yValue]
  )

  const handleVoronoiHover = useCallback((d) => {
    setActiveRow(d)
  }, [])

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <text className="title" x={innerWidth / 2} textAnchor="middle" y={-20}>
          Global Corona Virus Deaths Over Time By Country
        </text>
        <XAxis xScale={xScale} innerHeight={innerHeight} />
        <text
          className="axis-label"
          alignmentBaseline="hanging"
          y={innerHeight + 25}
          x={innerWidth / 2}
        >
          Time
        </text>

        <YAxis yScale={yScale} innerWidth={innerWidth} />
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(-35, ${innerHeight / 2}) rotate(-90)`}
        >
          Cummulative Deaths
        </text>
        {data.map((countryTimeSeries) => (
          <path className="marker-line" d={lineGenerator(countryTimeSeries)} />
        ))}
        {activeRow ? (
          <>
            <path
              className="marker-line active"
              d={lineGenerator(
                data.find(
                  (countryTimeSeries) =>
                    countryTimeSeries.countryName === activeRow.countryName
                )
              )}
            />
            <g
              transform={`translate(${lineGenerator.x()(
                activeRow
              )}, ${lineGenerator.y()(activeRow)})`}
            >
              <circle r={10} />
              <ToolTip activeRow={activeRow} className="tooltip-highlight" />
              <ToolTip activeRow={activeRow} className="tooltip" />
            </g>
          </>
        ) : null}
        <VoronoiOverlay
          allData={allData}
          lineGenerator={lineGenerator}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          onHover={handleVoronoiHover}
          margin={margin}
        />
      </g>
    </svg>
  )
}
