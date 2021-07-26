import React, { Component } from 'react';
import Position from './position'
import Wpm from './stats/wpm'
import Timer from './timer'
import getRandomText from './getRandomText'
import './charColors.css'
import { leastIndex, thresholdScott } from 'd3-array';
class InputText extends Component {
    state = {
        text: '...',
        p: 0,
        // n lembro pq tao separadas
        backSpaceList: [],
        failedAttempts: [],
        time: 40000,
        log: [],
        settings: {}
    }


    // keyEventHandler = (e) => {
    //     e.preventDefault()
    //     const currentKey = this.state.text[this.state.p]
    //     // muda espaço por this.props.whitespace
    //     const userInput = e.key === ' ' ? this.props.whitespace : e.key

    //     // ver se eh backspace
    //     if (userInput === 'Backspace') {
    //         this.setState({
    //             backSpaceList: this.state.backSpaceList.slice(0, -1)
    //         })
    //         return
    //     }

    //     // ignorar telcas q n sao caracteres
    //     else if (userInput.length != 1) {
    //         return
    //     }
    //     // inserir letra nos erros
    //     else if (userInput !== currentKey) {

    //         this.setState({
    //             backSpaceList: this.state.backSpaceList.concat(userInput),
    //             failedAttempts: this.state.failedAttempts.concat(userInput)
    //         })
    //         // se a tecla for ' ' insere um this.props.whitespace
    //         // this.setState({
    //         //     backSpaceList: userInput===' ' ? this.state.backSpaceList.concat(this.props.whitespace) : this.state.backSpaceList.concat(userInput),
    //         //     failedAttempts: this.state.failedAttempts.concat(userInput)
    //         // })
    //     }

    //     // verificar se tem letras erradas
    //     else if (!this.state.backSpaceList.length == 0) {
    //         // se apertou o certo mas tem letras erradas
    //         if (userInput === currentKey) {
    //             this.setState({
    //                 backSpaceList: this.state.backSpaceList.concat(userInput),
    //                 failedAttempts: this.state.failedAttempts.concat(userInput)
    //             })
    //         }
    //         if (this.state.settings.ignore_typos !== '1') {
    //             return

    //         }
    //     }
    //     // verificar se eh a tecla certa
    //     // redundante se nao tiver ignorando o backspace
    //     if (userInput === currentKey) {
    //         // mover o p
    //         this.setState({
    //             // move the cursor
    //             p: this.state.p + 1,
    //             // log the event
    //             log: this.state.log.concat(new Position(this.state.p, currentKey, this.state.failedAttempts)),
    //             // reset failedAttempts
    //             failedAttempts: [],
    //             backSpaceList: []
    //         })
    //     }


    // }

    inputChangeHandler = (e) => {
        // substitui os whitespace
        e.target.value = e.target.value.replace(' ', this.props.whitespace)

        // for backspace n adiciona o erro nem avança o p
        if(e.inputType === 'deleteContentBackward'||e.inputType==='deleteWordBackward') {
            return
        }

        const checkLen = this.state.settings.ignore_typos !== '1' ? 4 : 1
        const lastInputChar = e.target.value[e.target.value.length-1]
        const lastInputChars = e.target.value.slice(-checkLen)
        const textChars = this.state.text.slice(this.state.p - lastInputChars.length+1, this.state.p + 1)
        // console.log(lastInputChars,' : ',textChars)

        // se for errado
        if (lastInputChars !== textChars) {
            //(pro log)
            this.setState({
                failedAttempts: this.state.failedAttempts + lastInputChar
            })
        }

        // se for certo
        if (lastInputChars === textChars) {
            this.setState(({ p, log,failedAttempts }) => ({
                p: p + 1,
                log: log.concat(new Position(p, lastInputChar, failedAttempts)),
                failedAttempts: []
            }))
        }
    }

    timerFinishedHandler = () => {
        console.log('timer finished!')

        // seta o p pro proximo espaço
        localStorage.randomTextP = localStorage.randomText.indexOf(this.props.whitespace, this.state.p) + 1
        this.props.onFinish(this.state.log)

    }

    focusInput = ()=>{
        const inputElement = document.getElementById('inputElement')
        setTimeout(()=>{
            inputElement.focus()
            console.log("foused!")
        },300)
        
        
    }



    render() {

        const charN = 50
        const text = this.state.text.substring(this.state.p, this.state.p + charN)
        // axo q se usasse um modelo de pilha (fi-lo) ao invez de criar o array toda vez seria melhor
        const taggedText = [...new Array(charN)].map((x, i) => (
            <tspan className={`char${text[i]?.toUpperCase()}`} key={this.state.p, i}>{text[i]}</tspan>
        ))

        return (
            <>
                {/* se tiver tempo, renderiza o timer se ja tiver 1 log, se não renderiza a msg */}
                {this.props.time != 0 && (this.state.log.length > 0 ? <Timer onFinish={this.timerFinishedHandler} time={this.props.time} /> : <p style={{ color: 'gray' }}>{this.props.time / 1000}s</p>)}
                {/* se nao tiver tempo maximo definido */}
                {this.props.time == 0 && (<button className='start_btn' onClick={this.timerFinishedHandler}>Submit</button>)}
                <div className='input-div'>
                <input id='inputElement' className='input-element' type='text'></input>

                <svg className='inputSVG' width='100%' height='100%' onKeyDown={this.set}>
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ 'stopColor': 'black', 'stopOpacity': 1 }} />
                            <stop offset="60%" style={{ 'stopColor': 'black', 'stopOpacity': 1 }} />
                            <stop offset="84%" style={{ 'stopColor': 'transparent', 'stopOpacity': 1 }} />
                            <stop offset="100%" style={{ 'stopColor': 'transparent', 'stopOpacity': 1 }} />
                        </linearGradient>
                    </defs>
                    {/* no final tem q mudar o +50 se n o texto n anda */}
                    <text  x='50%' y='45' fill='gray'>{this.state.settings.solid_color === '1' ? text : taggedText}</text>
                    
                </svg >
                </div>

                <Wpm log={this.state.log} whitespace={this.props.whitespace} >WPM: </Wpm>
            </>
        );
    }

    async componentDidMount() {
        const inputElement = document.getElementById('inputElement')
        this.setState({
            text: await(await (await fetch('/assets/frankstein.txt')).text()).replaceAll(' ',this.props.whitespace),
            // text: await getRandomText(this.props.whitespace),
            p: parseInt(localStorage.randomTextP)
        })

        //load dos settings
        this.state.settings.solid_color = localStorage.solid_color
        this.state.settings.ignore_typos = localStorage.ignore_typos
        this.setState({ settings: this.state.settings })

        // substitui todos os whitespace do texto por this.props.whitespace
        // this.setState({text:this.state.text.replaceAll(/\s+/g,this.props.whitespace)}) 
        // ␣

        // window.addEventListener('keydown', this.keyEventHandler)
        this.focusInput()
        inputElement.addEventListener('input', this.inputChangeHandler)
        inputElement.addEventListener('blur', this.focusInput)
 
    }

    componentWillUnmount() {
        const inputElement = document.getElementById('inputElement')

        // window.removeEventListener('keydown', this.keyEventHandler)
        inputElement.removeEventListener('input', this.inputChangeHandler)
        inputElement.removeEventListener('blur', this.focusInput())
    }

}

export default InputText;