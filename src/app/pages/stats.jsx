import React, { Component } from 'react';
import LineChart from '../appComponents/stats/lineChart'
import {getWpm} from '../appComponents/stats/wpm'
import {getAccuracy} from '../appComponents/stats/accuracy'
import { Flex } from '@theme-ui/components';
import '../appComponents/statscss.css'

class Stats extends Component {
    state = { 
        content:<></>,
        logs:[]
    }

    render() { 
        
        return ( <>
            {this.state.content}
        </> );
    }

    componentDidMount(){
        // ver se ja tem dados
        if(!localStorage.history) {
            this.setState({
                content:<h3>No Data Yet!</h3>
            })
        return
        }
        
        // parse local storage logs
        let logs = JSON.parse(localStorage.history)
            logs = logs.map(log => log.map(c => { c.timestamp = new Date(c.timestamp); return c }))

        if(logs.length==1) {
            this.setState({
                content:<h3>No Data Yet!</h3>
            })
        return
        }

        // calcular os wpm dos desafios
        const data  = logs.map(log => ({
            time:log[0].timestamp,
            wpm:parseFloat(getWpm(log, '␣')),
            accuracy:getAccuracy(log)
        }))


        this.setState({content:
            <>
            <div className='charts'>
            <LineChart title = {'WPM'} data={data} x={d => d.time} y={d => d.wpm} unit=''/>
            <LineChart title = {'Accuracy'} data={data} x={d => d.time} y={d => d.accuracy} unit='%'/>
            </div>
            </>
        })

        
    }
}
 
export default Stats;