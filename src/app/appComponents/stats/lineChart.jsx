import React, { Component } from 'react';
import * as d3 from 'd3'
import { json } from 'd3';
// import{getWpm} from './wpm'
class lineChart extends Component {
    state = {
        width: 600,
        height: 250
    }



    render() {

        // dimensoes
        const { width, height } = this.state
        const margin = { top: 20, right: 30, bottom: 20, left: 40 }
        const innerHeight = height - margin.top - margin.bottom
        const innerWidth = width - margin.right - margin.left


        const {data,x,y} = this.props
        // escalas
        const xScale = d3.scaleTime().domain(d3.extent(data.map(d=>x(d)))).range([0, innerWidth]).nice()
        const yScale = d3.scaleSequential().domain(d3.extent(data.map(d=>y(d))).reverse()).range([0, innerHeight]).nice()


        // cria a linha
        const line = d3.line()
        .x((d, i) => xScale(x(d)))
        .y(d => yScale(y(d)))
        .curve(d3.curveStep)(data)

        // cria o eixo x
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
                    y={innerHeight+4}
                    dy='.71em'
                    style={{ textAnchor: 'middle' }}
                >{d3.timeFormat('%e/%m')(tickValue)}
                </text>
            </g>
        ))

        // eixo y
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
                    x='-4'
                    dy='.32em'
                    style={{ textAnchor: 'end' }}
                >{tickValue}
                </text>
            </g>
        ))

        // jsx
        return (<svg width={width} height={height}>
            <g transform={`translate(${margin.left},${margin.top})`}>
                <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2px' stroke='black' d={line} />
                {xTicks}
                {yTicks}
            </g>
        </svg>);

    }
}



// componentDidMount(){}

export default lineChart;