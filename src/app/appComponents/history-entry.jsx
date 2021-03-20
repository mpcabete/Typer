import React, { Component } from 'react';
import {timeFormat} from 'd3'
class HistoryEntry extends Component {
  state = { 
    
    selected:true
   }

  onSelect = ()=>{
    this.setState({selected : !this.state.selected})
    this.props.onSelect(this.props.time)
  }

  delete = ()=>{


  }

  render() { 
    return ( <>
    <p>
          <button onClick={this.delete} className='delete-btn'><svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.25 9.75L9.75 17.25M17.25 17.25L9.75 9.75L17.25 17.25Z" stroke="black" strokeWidth="2" strokeLinecap="round" />
            <path d="M13.5 26C20.4036 26 26 20.4036 26 13.5C26 6.59644 20.4036 1 13.5 1C6.59644 1 1 6.59644 1 13.5C1 20.4036 6.59644 26 13.5 26Z" stroke="black" strokeWidth="2" />
          </svg>
          </button>
          <button onClick = {this.onSelect}className='select-btn'>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2H3C2.73478 2 2.48043 2.10536 2.29289 2.29289C2.10536 2.48043 2 2.73478 2 3V13C2 13.2652 2.10536 13.5196 2.29289 13.7071C2.48043 13.8946 2.73478 14 3 14H13C13.2652 14 13.5196 13.8946 13.7071 13.7071C13.8946 13.5196 14 13.2652 14 13V3C14 2.73478 13.8946 2.48043 13.7071 2.29289C13.5196 2.10536 13.2652 2 13 2V2ZM3 13V3H13V13H3Z" fill="black" />
              <path className={this.state.selected? "selected":'unselected'} d="M7 10.75L4.5 8.27L5.295 7.5L7 9.175L10.705 5.5L11.5 6.29L7 10.75Z" fill="black" />
            </svg>

          </button>



          <span className='date-span'>{timeFormat('%e/%m %-I:%M%p')(this.props.time)}</span><br />
          <span>Wpm:{this.props.wpm}</span>
          <span>Acc:{this.props.acc}%</span>
        </p>
    </> );
  }
}
 
export default HistoryEntry;
