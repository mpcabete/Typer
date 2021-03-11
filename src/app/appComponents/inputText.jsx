import React, { Component } from 'react';
import Position from './position'
import Wpm from './stats/wpm'
import AttemptsList from './stats/attemptsList'
import Timer from './timer'
import rw from 'random-words'
class InputText extends Component {
    state = {
        text: '',
        p: 0,
        backSpaceList:[],
        failedAttempts: [],
        time:40000,
        log: []
    }

    // async getBook(){
    //     let res = await fetch('/book.txt')
    //     let book = await res.text()
    //     return book.replaceAll('\n','').replaceAll('’','')
    // }
    // qqr coisa da pra usar o charCode com o evento keypress
    keyEventHandler = (e) => {
        const currentKey = this.state.text[this.state.p]
        // muda espaço por this.props.whitespace
        const userInput = e.key === ' ' ? this.props.whitespace:e.key
        // ver se eh backspace
        if(userInput==='Backspace'){
            this.setState({
                backSpaceList:this.state.backSpaceList.slice(0,-1)
            })
            return
        }
        
        // ignorar telcas q n sao caracteres
        else if(userInput.length != 1){
            return
        }
        // inserir letra nos erros
        else if(userInput !== currentKey){

            this.setState({
                backSpaceList:this.state.backSpaceList.concat(userInput),
                failedAttempts: this.state.failedAttempts.concat(userInput)
            })
            // se a tecla for ' ' insere um this.props.whitespace
            // this.setState({
            //     backSpaceList: userInput===' ' ? this.state.backSpaceList.concat(this.props.whitespace) : this.state.backSpaceList.concat(userInput),
            //     failedAttempts: this.state.failedAttempts.concat(userInput)
            // })
        }
        
        // verificar se tem letras erradas
        else if(!this.state.backSpaceList.length==0){
            // se apertou o certo mas tem letras erradas
            if(userInput === currentKey){
                this.setState({
                    backSpaceList:this.state.backSpaceList.concat(userInput),
                    failedAttempts: this.state.failedAttempts.concat(userInput)
                })
            }
            return
        }
        // verificar se eh a tecla certa
        // redundante, eu sei
        else if (userInput === currentKey) {
            // mover o p
            this.setState({
                // move the cursor
                p: this.state.p + 1,
                // log the event
                log: this.state.log.concat(new Position(this.state.p,currentKey, this.state.failedAttempts)),
                // reset failedAttempts
                failedAttempts: []
            })
        }else {
            console.log("algo de errado nao esta certo no keyEventHandler")
        }
        // - talvez deixar sempre o prevent default?
        // prevent default do espaço (scroll)
        if(e.key===' '){
            e.preventDefault()
        }
        
        
    }
    
    timerFinishedHandler = () => {
        console.log('finished')
        // salva o log
        // informação visual de q o tempo acabou
        // reinicia o log
        this.props.onFinish(this.state.log)
        // this.setState({
        //     log:[]
        // })
    }
    
    
    render() {
        return (
            <>
            {this.state.log.length>0 ? <Timer onFinish={this.timerFinishedHandler} time={this.state.time}/> : <p>Start typing</p>}

                <svg width='100%' height='100%' onKeyDown={this.set}>
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ 'stopColor': 'black', 'stopOpacity': 1 }} />
                            <stop offset="60%" style={{ 'stopColor': 'black', 'stopOpacity': 1 }} />
                            <stop offset="100%" style={{ 'stopColor': 'transparent', 'stopOpacity': 1 }} />
                        </linearGradient>
                    </defs>
                    <text textAnchor="end" x='50%' y='100' fill='red'> {this.state.backSpaceList} </text>
                    {/* no final tem q mudar o +50 se n o texto n anda */}
                    <text x='50%' y='100' fill='url(#grad1)'>{this.state.text.substring(this.state.p, this.state.p + 50)}</text>
                </svg >
                    
                <Wpm log={this.state.log} whitespace={this.props.whitespace} />
                <AttemptsList log={this.state.log}/>
            </>
        );
    }

    componentDidMount() {
        // this.getBook().then(book=>{
        //     this.setState({text:book})
        // })

        // randon text
        this.setState({text:rw({ exactly: 50, join: this.props.whitespace })})

        // substitui todos os whitespace do texto por this.props.whitespace
        // this.setState({text:this.state.text.replaceAll(/\s+/g,this.props.whitespace)}) 
        // ␣

        window.addEventListener('keydown', this.keyEventHandler)
    }

    componentWillUnmount(){
        window.removeEventListener('keydown', this.keyEventHandler)
    }
   
}

export default InputText;