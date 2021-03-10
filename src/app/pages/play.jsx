import React, { Component } from 'react';
import InputText from '../appComponents/inputText'
import Wpm from '../appComponents/stats/wpm'
import ColorViz from '../appComponents/stats/colorViz'
class PlayPage extends Component {
    state = { 
        whitespace:'␣',
        content:
            <p>p</p>
         
     }

    

    startChallange = () => {
        console.log('click')
        this.setState({
            content:<InputText onFinish={this.challangeEndHandler} whitespace={this.state.whitespace}/>
        })
    }

    challangeEndHandler = (log)=>{
        this.setState({
            content:<>
            <button onClick={this.startChallange}>Start Challange</button>
            <h2>WPM:</h2>
            <Wpm log={log} whitespace = {this.state.whitespace}/>
            <ColorViz log={log}/>
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
            content:<button onClick={this.startChallange}>Start Challange</button>
        })
    }
}
 
export default PlayPage;