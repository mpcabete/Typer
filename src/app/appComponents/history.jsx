import React from 'react';
import { timeFormat } from 'd3'
import HistoryEntry from './history-entry'

const History = ({ data,onSelect,onDelete }) => {

  const listElements = data.map(
    log => (
      <li key={log.time}>
        <HistoryEntry 
        time={log.time} 
        wpm={log.wpm} 
        acc={log.accuracy.toFixed(1)}
        onSelect={onSelect}
        onDelete={onDelete}
        />
      </li>
    )
  ).reverse()





  return (<ol className='history-list'>{listElements}</ol>);
}

export default History;