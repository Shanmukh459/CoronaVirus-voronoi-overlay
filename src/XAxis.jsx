import { axisBottom, select } from "d3"
import { useEffect, useRef } from "react"

export const XAxis = ({xScale, innerHeight}) => {
  const ref = useRef()
  useEffect(() => {
    const XAxisG = select(ref.current)
    const xAxis = axisBottom(xScale)
      .tickSize(innerHeight)
      .tickPadding(5)

    XAxisG.call(xAxis)
  })
  return (
    <g ref={ref}></g>
  )
}