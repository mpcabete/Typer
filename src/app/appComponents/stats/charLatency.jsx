import React from 'react';

const Latencys = ({logs}) => {
  let chars = {}
  for(let i in logs){
    const log = logs[i]
    for (let j in log){
      if (j==0) continue
      const char = log[j].char
      const latency = log[j].timestamp - log[j-1].timestamp
      if(!chars[char]) chars[char] = []
      chars[char].push(latency)
    }
  }
  const charskeys = Object.keys(chars)
  for (let i in charskeys){
    const char = charskeys[i]
    chars[char] = chars[char].reduce((a,t)=>a+t,0)/chars[char].length
  }
  charskeys.sort((e,p)=>chars[p]-chars[e])
const list = charskeys.map(c=>{
 return <tr key={c}><td>{c}</td><td>{Math.floor(chars[c])}ms</td></tr>
})

  return ( <table className='latency-list'>
    <thead>
    <tr>
      <th>Char</th>
      <th>Latency</th>
    </tr>
    </thead>
    <tbody>
    {list}
    </tbody>
    </table> );
}
 
export default Latencys;