import React, { useEffect, useRef } from 'react';
import { select, axisBottom, scaleLinear } from 'd3'
const Axis = ({ minmax, colors }) => {
    const ref = useRef()
    const width = document.querySelector('.container').clientWidth - 100
    useEffect(() => {
        console.log('minmax', minmax)
        const scale = scaleLinear().domain(minmax).range([0, width])
        const axisG = select(ref.current);
        //TODO: mudar ticks pra width menor
        const ticks = 10
        const valueScale = scaleLinear().domain([0, ticks - 1]).range(minmax)
        const values = Array(ticks).fill().map((x, i) => {
            return valueScale(i)
        })
        console.log(values)
        axisG.call(axisBottom(scale)
            .tickValues(values)
            .tickFormat(x => `${Math.round(x)} ms`)
            .tickPadding(10))
            .attr('transform', 'translate(24,24)')
    }, [])

    return (<svg width={'100%'} height={100}>
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ 'stopColor': colors[0], 'stopOpacity': 1 }} />
                <stop offset="100%" style={{ 'stopColor': colors[1], 'stopOpacity': 1 }} />
            </linearGradient>
        </defs>
        <rect width={width} height='20px' transform='translate(25,0)' fill='url(#grad1)' />
        <g ref={ref} />
    </svg>);
}

export default Axis;