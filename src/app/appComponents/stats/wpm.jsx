import React, { Component } from 'react';

const Wpm = ({log,whitespace,lastChallange}) => {

    const wpm = getWpm(log,whitespace)

    let deltaSpan
    if(lastChallange){
        let currentWpm = isNaN(wpm)?0:wpm
        let lastWpm = getWpm(lastChallange,whitespace)
        
        const deltaWpm =  (currentWpm - lastWpm).toFixed(2)
        const deltaStyle = (value) => {
            return value<0?{color:'red'}:{color:'green'}
        }
        deltaSpan = <span style={deltaStyle(deltaWpm)}>{`(${deltaWpm>0 ? '▴':'▾'} ${Math.abs(deltaWpm)})`}</span>
        
    }else deltaSpan = <></>
    return <p className='wpm_counter'>
        <span>{wpm} {deltaSpan}</span>
        </p>


}
export const getWpm = (log,whitespace)=>{

    const words = log.filter(c => c.char === whitespace).length
    if (words == 0) return '--'
    const tZero = log[0].timestamp.getTime()
    const tNow = log[log.length - 1].timestamp.getTime()
    const deltaT = (tNow - tZero) / 1000
    const wpm = (words / deltaT * 60).toFixed(2)
    return wpm
}

export default Wpm



