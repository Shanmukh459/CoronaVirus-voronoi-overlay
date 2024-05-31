import { csv, timeParse } from "d3"
import React, { useState, useEffect } from "react"

const csvUrl =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv"

const parseDay = timeParse("%m/%d/%y")

const transformData = (rawData) => {
  const countriesData = rawData.filter(d => !d['Province/State'])
  const days = rawData.columns.slice(4)

  return countriesData.map(d => {
    const countryName = d['Country/Region']
    const countryTimeSeries =  days.map(day => ({
      date: parseDay(day),
      totalDeaths: +d[day],
      countryName
    }))
    countryTimeSeries.countryName = countryName
    return countryTimeSeries
  })
}

export const useData = () => {
  const [data, setData] = useState()

  useEffect(() => {
    csv(csvUrl).then(rawData => setData(transformData(rawData)))
  }, [])

  return data
}
