import React, { Component } from 'react';

class Wpm extends Component {

    getWpm = () => {
        const log = this.props.log
        const words = log.filter(c => c.char === this.props.whitespace).length
        if (words == 0) return '--'
        const tZero = log[0].timestamp.getTime()
        const tNow = log[log.length - 1].timestamp.getTime()
        const deltaT = (tNow - tZero) / 1000
        const wpm = words / deltaT * 60
        return wpm.toFixed(2)

    }

    render() {
        return (
            <p>{this.getWpm()}</p>
        );
    }
}

export default Wpm;