import React, { Component } from 'react';
import * as d3 from 'd3'
import { json } from 'd3';
// import{getWpm} from './wpm'
class lineChart extends Component {
    state = {
        width: 650,
        height: 300
    }



    render() {

        // dimensoes
        const { width, height } = this.state
        const margin = { top: 22+6, right: 22+6, bottom: 8+12+22+12+7, left: 22+22 }
        const innerHeight = height - margin.top - margin.bottom
        const innerWidth = width - margin.right - margin.left


        const {title, data,x,y,unit} = this.props
        // escalas
        const xScale = d3.scaleTime().domain(d3.extent(data.map(d=>x(d)))).range([0, innerWidth]).nice()
        const yScale = d3.scaleSequential().domain([0,d3.extent(data.map(d=>y(d)))[1]].reverse()).range([0, innerHeight]).nice()


        // cria a linha
        const line = d3.line()
        .x((d, i) => xScale(x(d)))
        .y(d => yScale(y(d)))
        .curve(d3.curveMonotoneX)(data)

        // cria o eixo x
        const xTicks = xScale.ticks().map(tickValue => (
            <g
                className='tick'
                key={tickValue}
                transform={`translate(${xScale(tickValue)},0)`}
            >
                <line
                    y1={-6}
                    y2={innerHeight}
                    stroke='black'
                />
                <text
                    y={innerHeight+8}
                    dy='.71em'
                    style={{ textAnchor: 'middle' }}
                >{d3.timeFormat('%e/%m')(tickValue)}
                </text>
            </g>
        ))

        // eixo y
        const yTicks = yScale.ticks().map(tickValue => (
            <g
                className='tick'
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
                >{`${tickValue}${unit}`}
                </text>
            </g>
        ))

        // jsx
        return (
            <>
        <h3 className='chart_title'>{title}</h3>
        <svg className = 'chart' width={width} height={height}>
            <g transform={`translate(${margin.left},${margin.top})`}>
                <text
                className='axis_label'
                x={innerWidth/2} 
                y={innerHeight+12+8+22}
                textAnchor="middle" >Date</text>
                {xTicks}
                {yTicks}
                <path className='data_line' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2px' stroke='black' d={line} />
            </g>
        </svg>
        </>
        );

    }
}



// componentDidMount(){}

export default lineChart;