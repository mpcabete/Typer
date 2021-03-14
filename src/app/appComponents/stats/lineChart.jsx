import React, { Component } from 'react';
import * as d3 from 'd3'
import { json } from 'd3';
// import{getWpm} from './wpm'
class lineChart extends Component {
    state = {
        width: 500,
        height: 250
    }

    getWpm = (log, whitespace) => {

        const words = log.filter(c => c.char === whitespace).length
        if (words == 0) return 0
        const tZero = log[0].timestamp.getTime()
        const tNow = log[log.length - 1].timestamp.getTime()
        const deltaT = (tNow - tZero) / 1000
        const wpm = (words / deltaT * 60).toFixed(2)
        return wpm
    }

    render() {
       return <></>
    }

    componentDidMount(){

        if (localStorage.history) {
            const { width, height } = this.state
            const margin = { top: 20, right: 20, bottom: 20, left: 40 }
            const innerHeight = height - margin.top - margin.bottom
            const innerWidth = width - margin.right - margin.left

            let logs = JSON.parse(localStorage.history)
            logs = logs.map(log => log.map(c => { c.timestamp = new Date(c.timestamp); return c }))
            const times = logs.map(log => log[0].timestamp)
            const wpms = logs.map(log => parseFloat(this.getWpm(log, '␣')))

            const xScale = d3.scaleTime().domain(d3.extent(times)).range([0, innerWidth]).nice()
            const yScale = d3.scaleSequential().domain(d3.extent(wpms).reverse()).range([0, innerHeight]).nice()


            // const yScale = d3.scaleLinear().domain(d3.extent(data.map(d=>d.value))).range([0,200])
            // console.log('scale',yScale(data[4].value))
            const line = d3.line().x((d, i) => xScale(d[0])).y(d => yScale(d[1]))
                .curve(d3.curveStep)(logs.map((log, i) => [times[i], wpms[i]]))

            const xTicks = xScale.ticks().map(tickValue => (
                <g
                    key={tickValue}
                    transform={`translate(${xScale(tickValue)},0)`}
                >
                    <line
                        y2={innerHeight}
                        stroke='black'
                    />
                    <text
                        y={innerHeight}
                        dy='.71em'
                        style={{ textAnchor: 'middle' }}
                    >{tickValue.getHours()}
                    </text>
                </g>
            ))

            const yTicks = yScale.ticks().map(tickValue => (
                <g
                    key={tickValue}
                    transform={`translate(0,${yScale(tickValue)})`}
                >
                    <line
                        x2={innerWidth}
                        stroke='black'
                    />
                    <text
                        x='-3'
                        dy='.32em'
                        style={{ textAnchor: 'end' }}
                    >{tickValue}
                    </text>
                </g>
            ))




            return (<svg width={width} height={height}>
                <g transform={`translate(${margin.left},${margin.top})`}>
                    <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2px' stroke='black' d={line} />
                    {xTicks}
                    {yTicks}
                </g>
            </svg>);
        } else return (<h1>no Data</h1>)
    }
}

export default lineChart;