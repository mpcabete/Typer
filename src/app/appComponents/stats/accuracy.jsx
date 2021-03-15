import React, { Component } from 'react';

const Acurracy = ({log, lastChallange, showDelta}) => {

    // const lastChallange = localHistory[localHistory.length-2] ?? null

        // esse n usa os timestamp
        // .map(c=>{c.timestamp = new Date(c.timestamp); return c})

        const accuracy = getAccuracy(log).toFixed(1)
        let deltaSpan
        if(lastChallange && showDelta){
            const deltaAccuracy = (accuracy - getAccuracy(lastChallange)).toFixed(1)
            const deltaStyle = (value) => {
                return value<0?{color:'red'}:{color:'green'}
            }
            deltaSpan = <span style={deltaStyle(deltaAccuracy)}>{`(${deltaAccuracy>0 ? '▴':'▾'} ${Math.abs(deltaAccuracy)}%)`}</span>
            
        }else deltaSpan = <></>

    return (<p className='accuracy_counter'>
        <span>
        {accuracy}% {deltaSpan}
        </span>
        </p>);
}
 
export default Acurracy;

export const getAccuracy = (log)=>{
    const total = log.length
    // numero de teclas n não acertou de primeira
    const miss = log.filter(e=>e.attempts.length!=0).length
    return((1-(miss/total))*100)
}