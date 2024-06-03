import { Delaunay } from "d3"
import { useMemo } from "react"

export const VoronoiOverlay = ({
  allData,
  lineGenerator,
  innerWidth,
  innerHeight,
  onHover,
  margin,
}) => {
  return useMemo(() => {
    const points = allData.map((d) => [
      lineGenerator.x()(d),
      lineGenerator.y()(d),
    ])
    const delaunay = Delaunay.from(points)
    const voronoi = delaunay.voronoi([
      0,
      0,
      innerWidth + margin.right,
      innerHeight,
    ])

    return (
      <g className="voronoi">
        {points.map((point, i) => (
          <path
            onMouseEnter={() => onHover(allData[i])}
            d={voronoi.renderCell(i)}
          />
        ))}
      </g>
    )
  }, [allData, lineGenerator, innerHeight, innerWidth])
}
