import React, { Component } from 'react';
import * as d3 from 'd3'


const ColorViz = ({log}) => {
    const deltaTs = log.map((e,i)=>{
        return(e.timestamp - (log[i==0?0:i-1].timestamp))
    })
    deltaTs[0]=deltaTs[1]
    const minmax = d3.extent(deltaTs)
    const colorScheme = d3.scaleSequential(d3.interpolatePlasma).domain(minmax)
    const viz = log.map((e,i)=>{
        return(
            <span key={i} style={{color:colorScheme(deltaTs[i])}}>{e.char}</span>
        )
    })

    
    

    
    return ( <p style={{fontWeight:'bold'}}>{viz}</p> );
}
 
export default ColorViz;

