import React, { Component } from 'react';
import Position from './position'
import Wpm from './stats/wpm'
import Timer from './timer'
import './charColors.css'
class InputText extends Component {
    state = {
        text: '',
        p: 0,
        // n lembro pq tao separadas
        backSpaceList:[],
        failedAttempts: [],
        time:40000,
        log: [],
        settings:{}
    }

    // async getBook(){
    //     let res = await fetch('/book.txt')
    //     let book = await res.text()
    //     return book.replaceAll('\n','').replaceAll('’','')
    // }
    // qqr coisa da pra usar o charCode com o evento keypress
    keyEventHandler = (e) => {
        e.preventDefault()
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
            if(this.state.settings.ignore_typos!=='1'){
                return

            }
        }
        // verificar se eh a tecla certa
        // redundante se nao tiver ignorando o backspace
        if (userInput === currentKey) {
            // mover o p
            this.setState({
                // move the cursor
                p: this.state.p + 1,
                // log the event
                log: this.state.log.concat(new Position(this.state.p,currentKey, this.state.failedAttempts)),
                // reset failedAttempts
                failedAttempts: [],
                backSpaceList:[]
            })
        }
        // - talvez deixar sempre o prevent default?
        // prevent default do espaço (scroll)
        // if(e.key===' '){
        //     e.preventDefault()
        // }
        
        
    }
    
    timerFinishedHandler = () => {
        console.log('finished!')
        // salva o log
        // informação visual de q o tempo acabou
        // reinicia o log
        this.props.onFinish(this.state.log)
        // this.setState({
        //     log:[]
        // })
    }

    getRandonWord(list,entry){
        let i = 0
        
        while(entry>0){
            entry -= list[i][1]
            i++
            
        }
        return list[i][0]
    
        }

    getRandomWords = async ()=>{
        const language = localStorage.language ?? 'en'
        
        const response = await fetch(`/wordlist/${language}.json`)
        if(response.status>400){
            this.setState({text:"Unable to get Text :("})
            return
        }    
        const {totalEntrys,list} = await response.json()
         
     
        const arr = [...new Array(300)].map(()=>this.getRandonWord(list,Math.random()*totalEntrys))
        const txt = arr.join(this.props.whitespace)
        this.setState({text:txt})

        
    }
    
    
    render() {
        const charN = 50
        const text = this.state.text.substring(this.state.p, this.state.p + charN)
        // axo q se usasse um modelo de pilha (fi-lo) ao invez de criar o array toda vez seria melhor
        const taggedText = [...new Array(charN)].map((x,i)=>(
            <tspan className={`char${text[i]?.toUpperCase()}`} key={this.state.p,i}>{text[i]}</tspan>
        ))
        return (
            <>
            {this.state.log.length>0 ? <Timer onFinish={this.timerFinishedHandler} time={this.state.time}/> : <p>{this.state.time/1000}s, The timer starts when you type</p>}

                <svg className='inputSVG' width='100%' height='100%' onKeyDown={this.set}>
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ 'stopColor': 'black', 'stopOpacity': 1 }} />
                            <stop offset="60%" style={{ 'stopColor': 'black', 'stopOpacity': 1 }} />
                            <stop offset="84%" style={{ 'stopColor': 'transparent', 'stopOpacity': 1 }} />
                            <stop offset="100%" style={{ 'stopColor': 'transparent', 'stopOpacity': 1 }} />
                        </linearGradient>
                    </defs>
                    <text className='failed_attempts' textAnchor="end" x='50%' y='100'> {this.state.backSpaceList} </text>
                    {/* no final tem q mudar o +50 se n o texto n anda */}
                    <text x='50%' y='100' fill='url(#grad1)'>{this.state.settings.solid_color==='1'?text:taggedText}</text>
                    <rect className='carret' x='calc(50% - 2px)' y='calc(100px - 1em)' width='2px' />
                </svg >
                    
                <Wpm log={this.state.log} whitespace={this.props.whitespace} >WPM: </Wpm>
            </>
        );
    }

    componentDidMount() {

        // randon text
        this.getRandomWords()
        // this.setState({text:'kakakakak'})

        //load dos settings
        this.state.settings.solid_color=localStorage.solid_color
        this.state.settings.ignore_typos=localStorage.ignore_typos
        this.setState({settings:this.state.settings})

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