import React, { Component } from 'react';

const Wpm = ({log,whitespace,lastChallange}) => {

    const getWpm = (log,whitespace)=>{

        const words = log.filter(c => c.char === whitespace).length
        if (words == 0) return '--'
        const tZero = log[0].timestamp.getTime()
        const tNow = log[log.length - 1].timestamp.getTime()
        const deltaT = (tNow - tZero) / 1000
        const wpm = (words / deltaT * 60).toFixed(2)
        return wpm
    }
    const wpm = getWpm(log,whitespace)

    let deltaSpan
    if(lastChallange){
        const deltaWpm = (wpm - getWpm(lastChallange,whitespace)).toFixed(2)
        const deltaStyle = (value) => {
            return value<0?{color:'red'}:{color:'green'}
        }
        deltaSpan = <span style={deltaStyle(deltaWpm)}>{`(${deltaWpm>0 ? '▴':'▾'} ${Math.abs(deltaWpm)})`}</span>
        
    }else deltaSpan = <></>
    return <p>{wpm} {deltaSpan}</p>


}

export default Wpm
// export const getWpm = ({log,whitespace}) => {
//     const words = log.filter(c => c.char === whitespace).length
//     if (words == 0) return '--'
//     const tZero = log[0].timestamp.getTime()
//     const tNow = log[log.length - 1].timestamp.getTime()
//     const deltaT = (tNow - tZero) / 1000
//     const wpm = words / deltaT * 60
//     // return wpm.toFixed(2)


// }
// export default Wpm;

