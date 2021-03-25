import React, { Component } from 'react';
import InputText from '../appComponents/inputText'
import Wpm from '../appComponents/stats/wpm'
import ColorViz from '../appComponents/stats/colorViz'
import Acurracy from '../appComponents/stats/accuracy';
import playcss from '../appComponents/playcss.css'
import AttemptsList from '../appComponents/stats/attemptsList'
import KeyboardSvg from '../appComponents/keyboardSvg'
import{ color } from 'd3'
// const btn = <button className='start_btn' onClick={this.startChallange}>Start Challange</button>



class PlayPage extends Component {
    state = { 
        page:'pre',
        keyColors:defaultKeyColors,
        whitespace:'␣',
        content:
            <></>
         
     }

     onKeyDown = (e)=>{
         if(defaultKeyColors[e.key]){

             this.setState({keyColors: {...this.state.keyColors,[e.key]:color(defaultKeyColors[e.key]).darker().formatHex() }})
            }
      }
     onKeyUp = (e)=>{
        if(defaultKeyColors[e.key]){
             
            this.setState({keyColors: {...this.state.keyColors,[e.key]:defaultKeyColors[e.key]}})
        }
      }
      

    

    startChallange = () => {
        // console.log('click')
        this.setState({
            screen:'challenge',
            content:<>
            <InputText onFinish={this.challangeEndHandler} whitespace={this.state.whitespace}/>
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
            screen:'end',
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
            {this.state.screen==='challenge'&&<KeyboardSvg keyColors={this.state.keyColors}/>}
            

            </>
         );
    }

    componentDidMount(){

        window.addEventListener('keydown',(e)=>this.onKeyDown(e))
        window.addEventListener('keyup',(e)=>this.onKeyUp(e))
        this.setState({
            screen:'pre',
            content:
            <>
            {<button className='start_btn' onClick={this.startChallange}>Start Challenge</button>}
            </>
        })
    }

    componentWillUnmount(){
        window.removeEventListener('keydown',(e)=>this.onKeyDown(e))
        window.removeEventListener('keyup',(e)=>this.onKeyUp(e))
    }
}
 
export default PlayPage;

const defaultKeyColors = {
    q:'#E3BA22',
    a:'#E3BA22',
    z:'#E3BA22',
    w:'#E58429',
    s:'#E58429',
    x:'#E58429',
    e:'#BD2D28',
    d:'#BD2D28',
    c:'#BD2D28',
    r:'#D15A86',
    f:'#D15A86',
    v:'#D15A86',
    t:'#D15A86',
    g:'#D15A86',
    b:'#D15A86',
    y:'#42A5B3',
    h:'#42A5B3',
    n:'#42A5B3',
    u:'#42A5B3',
    j:'#42A5B3',
    m:'#42A5B3',
    i:'#0F8C79',
    k:'#0F8C79',
    o:'#6BBBA1',
    l:'#6BBBA1',
    p:'#5C8100',
    ç:'#5C8100',
    ' ':'#C0C0C0'
}