import { axisLeft, select } from "d3"
import { useEffect, useRef } from "react"

export const YAxis = ({ yScale, innerWidth}) => {
  const ref = useRef()

  useEffect(() => {
    const yAxisG = select(ref.current)
    const yAxis = axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(3)
    yAxisG.call(yAxis)
  }, [])
  return <g ref={ref}></g>
}