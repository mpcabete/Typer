import React, { Component } from 'react';
import InputText from '../appComponents/inputText'
import Wpm from '../appComponents/stats/wpm'
import ColorViz from '../appComponents/stats/colorViz'
import Acurracy from '../appComponents/stats/accuracy';
import playcss from '../appComponents/playcss.css'
import AttemptsList from '../appComponents/stats/attemptsList'
import keyboard from '../../../static/assets/keyboard.png'

// const btn = <button className='start_btn' onClick={this.startChallange}>Start Challange</button>

class PlayPage extends Component {
    state = { 
        whitespace:'␣',
        content:
            <></>
         
     }

    

    startChallange = () => {
        // console.log('click')
        this.setState({
            content:<>
            <InputText onFinish={this.challangeEndHandler} whitespace={this.state.whitespace}/>
            <img className='keyboard' src={keyboard}/>
            </>
        })
    }

    challangeEndHandler = (log)=>{
        // salvar log no local storage(talvez isso use mta memoria pra usuarios antigos)
        let localHistory = JSON.parse(localStorage.history ?? '[]')
        localHistory.push(log)

        localStorage.setItem('history',JSON.stringify( localHistory ))
        // mostra estatisticas
        const lastChallange = localHistory[localHistory.length-2]?.map(c=>{c.timestamp = new Date(c.timestamp); return c}) ?? null

        

        // const accuracy = getAccuracy(log).toFixed(1)
        // const deltaAccuracy = (accuracy - getAccuracy(lastChallange)).toFixed(1)
        // console.log('deltaAccuracy',deltaAccuracy)
        // const deltaStyle = (value) => {
        //     return value<0?{color:'red'}:{color:'green'}
        // }

        this.setState({
            content:<>
            
            {<button className='start_btn' onClick={this.startChallange}>Start Challenge</button>}
            <h2>WPM:</h2>
            <Wpm log={log} whitespace = {this.state.whitespace} lastChallange={lastChallange}/>
            <h2>Accuracy: </h2>
            <Acurracy log={log} lastChallange={localHistory[localHistory.length-2] ?? null} showDelta={true}/>
            <ColorViz log={log}/>
            <h2>Mistypes</h2>
            <AttemptsList log={log}/>
            </>
        })
        // mandar o log pra o backend
        // gerar statisticas resumidas

        // botão de restart/voltar
    }

    render() { 
        return ( 
            // play
            // iniciar desafio
            // modo livre
            // criar
            <>
            
            {this.state.content}


            </>
         );
    }

    componentDidMount(){
        this.setState({
            
            content:
            <>
            {<button className='start_btn' onClick={this.startChallange}>Start Challenge</button>}
            </>
        })
    }
}
 
export default PlayPage;