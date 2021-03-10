import React, { Component, useState } from 'react';
class Timer extends Component {
    
    constructor(props){
        super()
        this.state = {
            timeLeft:props.time

        }
    }

    render() { 
        return ( <p>{this.state.timeLeft/1000}</p> );
    }

    updateTime(interval){
        const newTime = this.state.timeLeft - interval
        if(newTime>0){
            this.setState({
                timeLeft:newTime
            })
        }
        else {
            this.props.onFinish()
        }
    }

    componentDidMount(){
        this.interval = 66
        this.myInterval = setInterval(() => {
        this.updateTime(this.interval)    
        }, this.interval);

    }
    componentWillUnmount(){
        clearInterval(this.myInterval)
    }
}
 
export default Timer;