import React, { Component } from 'react';
import * as d3 from 'd3'
import Axis from './axis'


const ColorViz = ({log}) => {
    const deltaTs = log.map((e,i)=>{
        return(e.timestamp - (log[i==0?0:i-1].timestamp))
    })
    deltaTs[0]=deltaTs[1]
    const minmax = d3.extent(deltaTs)
    const colorScheme = d3.scaleSequential(d3.interpolateOranges).domain(minmax)
    const colors = [colorScheme(minmax[0]),colorScheme(minmax[1])]
    console.log("colors",colors[0])
    const viz = log.map((e,i)=>{
        return(<span key={i} style={{color:colorScheme(deltaTs[i])}}>{e.char}</span>)
    })
    
    
    
    

    
    return (<> 
    <p style={{fontSize:'1.5em', fontWeight:'bold',textShadow:'0 0 2px black', overflowWrap:'anywhere'}}>{viz}</p> 
    <Axis minmax={minmax} colors={colors}/>
    </>);
}
 
export default ColorViz;

