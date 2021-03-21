import React, { Component } from 'react';
import LineChart from '../appComponents/stats/lineChart'
import {getWpm} from '../appComponents/stats/wpm'
import {getAccuracy} from '../appComponents/stats/accuracy'
import { Flex } from '@theme-ui/components';
import '../appComponents/statscss.css'
import History from '../appComponents/history'
import { selection } from 'd3-selection';

class Stats extends Component {
    state = { 
        content:<></>,
        data:[],
        selection:[]
    }

    selectHandler = (id)=>{
        // se ja tiver selecionado
        let selectionCopy = this.state.selection.slice()
        let selectionN = this.state.selection.length
        for(let i=0;i<selectionN;i++){
            let current = selectionCopy[i] 
            if(current.time.getTime()==id.getTime()){
                selectionCopy.splice(i,1)
                
                // 

                this.setState({selection:selectionCopy})
                console.log(`item ${i} removed`)
                return
                
            }
        }
        // se nao tiver selecionado
        const selected = this.state.data.filter(x=>x.time.getTime()==id.getTime())[0]
        const newSelection = [...this.state.selection,selected].sort((a,b)=>{
            return (a.time - b.time)    
            })

        this.setState({selection:newSelection})



    }

    // onDelete = (id)=>{

    // }

    render() { 
        const {selection} = this.state
        return ( <>
            <div className='stats-page'>
            <div className='charts'>
            <LineChart title = {'WPM'} data={selection} x={d => d.time} y={d => d.wpm} unit=''/>
            <LineChart title = {'Accuracy'} data={selection} x={d => d.time} y={d => d.accuracy} unit='%'/>
            </div>
            <div className='history-div'>
                <History data={this.state.data} onSelect={this.selectHandler}/>
            </div>
            </div>
        </> );
    }

    componentDidMount(){
        // ver se ja tem dados
        if(!localStorage.history) {
            this.setState({
                content:<h3>No Data Yet... Play a little more!</h3>
            })
        return
        }
        
        // parse local storage logs
        let logs = JSON.parse(localStorage.history)
            logs = logs.map(log => log.map(c => { c.timestamp = new Date(c.timestamp); return c }))

        if(logs.length==1) {
            this.setState({
                content:<h3>No Data Yet!</h3>,
                
            })
        return
        }

        // calcular os wpm dos desafios
        const data  = logs.map(log => ({
            time:log[0].timestamp,
            wpm:parseFloat(getWpm(log, '␣')),
            accuracy:getAccuracy(log)
        }))
        this.setState({
            data:data,
            selection:data
            // mudar pra previousSelection + new ?? data
        })


        // this.setState({
        //     content:
        //     // <div className='stats-page'>
        //     // <div className='charts'>
        //     // <LineChart title = {'WPM'} data={selection} x={d => d.time} y={d => d.wpm} unit=''/>
        //     // <LineChart title = {'Accuracy'} data={selection} x={d => d.time} y={d => d.accuracy} unit='%'/>
        //     // </div>
        //     // <div>
        //     //     <History data={data} onSelect={this.selectHandler}/>
        //     // </div>
        //     // </div>
        // })


        
    }
}
 
export default Stats;