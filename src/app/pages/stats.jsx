import React, { Component } from 'react';
import LineChart from '../appComponents/stats/lineChart'
import { getWpm } from '../appComponents/stats/wpm'
import { getAccuracy } from '../appComponents/stats/accuracy'
import { Flex } from '@theme-ui/components';
import '../appComponents/statscss.css'
import History from '../appComponents/history'
import { selection } from 'd3-selection';

class Stats extends Component {
    state = {
        content: <></>,
        data: [],
        selection: []
    }

    removeEntry = (acessor,a, id) => {
        const arr = a.slice()
        const len = arr.length

        for (let i = 0; i < len; i++) {
            let current = arr[i]
            console.log(acessor(current).getTime(), id.getTime())
            if (acessor(current).getTime() == id.getTime()) {
                arr.splice(i, 1)
                console.log(`item ${i} removed`)
                return arr
            }
        } return false

    }

    selectHandler = (id) => {
        // se ja tiver selecionado
        const selectionRemoved = this.removeEntry(d=>d.time,this.state.selection, id)

        if (selectionRemoved) {
            this.setState({ selection: selectionRemoved })
            return
        }
        // se nao tiver selecionado
        const selected = this.state.data.filter(x => x.time.getTime() == id.getTime())[0]
        const newSelection = [...this.state.selection, selected].sort((a, b) => {
            return (a.time - b.time)
        })

        this.setState({ selection: newSelection })



    }

    deleteHandler = (id) => {
        // remove do selection, e do data
        const newSelection=this.removeEntry(d=>d.time,this.state.selection,id)
        const newData = this.removeEntry(d=>d.time,this.state.data,id)
        if(newSelection)this.setState({selection:newSelection})
        if(newData)this.setState({data:newData})
        else(console.error('ID do delete n correspode a uma entrada'))

        const acessor = d=>d[0].timestamp

        this.logs = this.removeEntry(acessor,this.logs,id)

        //TODO: botao de save
        localStorage.history=JSON.stringify(this.logs)
        // atualiza o estado
        // tira do local storage
        // atualiza local storage
    }

    render() {
        const { selection } = this.state
        const xAxis = localStorage.xAxis ?? 'round'
        return (<>
            <div className='stats-page'>
                <div className='charts'>
                    <LineChart title={'WPM'} data={selection} x={d => d.time} y={d => d.wpm} unit='' xAxis={xAxis} />
                    <LineChart title={'Accuracy'} data={selection} x={d => d.time} y={d => d.accuracy} unit='%' xAxis={xAxis} />
                </div>
                <div className='history-div'>
                    <History data={this.state.data} onSelect={this.selectHandler} onDelete={this.deleteHandler} />
                </div>
            </div>
        </>);
    }

    
    componentDidMount() {
        // ver se ja tem dados
        if (!localStorage.history) {
            this.setState({
                content: <h3>No Data Yet... Play a little more!</h3>
            })
            return
        }

        // parse local storage this.logs
        this.logs = JSON.parse(localStorage.history)
        this.logs = this.logs.map(log => log.map(c => { c.timestamp = new Date(c.timestamp); return c }))

        if (this.logs.length == 1) {
            this.setState({
                content: <h3>No Data Yet!</h3>,

            })
            return
        }

        // calcular os wpm dos desafios
        const data = this.logs.map(log => ({
            time: log[0].timestamp,
            wpm: parseFloat(getWpm(log, '␣')),
            accuracy: getAccuracy(log)
        }))
        this.setState({
            data: data,
            selection: data
            // mudar pra previousSelection + new ?? data
        })
    }
}

export default Stats;