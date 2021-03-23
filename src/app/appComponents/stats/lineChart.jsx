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


        const {title, data, x, y, unit, xAxis} = this.props
        // escalas
        const xTimeScale = d3.scaleTime().domain(d3.extent(data.map(d=>x(d)))).range([0, innerWidth]).nice()
        const yScale = d3.scaleSequential().domain([0,d3.extent(data.map(d=>y(d)))[1]].reverse()).range([0, innerHeight]).nice()
        const xIndexScale = d3.scaleSequential().domain([0,data.length-1]).range([0, innerWidth])
        const xScale = xAxis==="round" ? xIndexScale:xTimeScale

        // formato da data
        let format 
        // horas
        if(deltaT<8640000){
            format = d3.timeFormat('%-I:%M%p')
        }
        // dias+horas
        // else if(deltaT<3*8640000){
        //     format = d3.timeFormat('%e/%m %-I:%M%p')
        // }
        // dias
        else{
            format = d3.timeFormat('%e/%m')
        }

        //bolinhas
        const bolinhas = <g className="bolinhas"> {data.map((d,i)=>(
            <circle
            key={x(d)}
            r='4'
            
            cx={xScale(xAxis==="round" ? i:x(d))}
            cy={yScale(y(d))}

            
            >
                <title>{format(x(d))}</title>
            </circle>
        ))
        }</g>


        // cria a linha
        const line = d3.line()
        // se eixo x for os rounds retorna a escala usando indice, se for tempo usa a do tempo
        .x((d, i) => xAxis==="round"?xScale(i):xScale(x(d)))
        .y(d => yScale(y(d)))
        .curve(d3.curveMonotoneX)(data)

        // cria o eixo x
        // escolhe a formatação da data dependendo da escala
        const domain = xScale.domain()
        const deltaT = domain[1]-domain[0]
        


        const xTicks = xScale.ticks().map((tickValue,i) => (
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
                    y={innerHeight+8} //aaki
                    dy='.71em'
                    style={{ textAnchor: 'middle' }}
                >{xAxis==='round'?i:format(tickValue)}
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
                {bolinhas}
            </g>
        </svg>
        </>
        );

    }
}



// componentDidMount(){}

export default lineChart;