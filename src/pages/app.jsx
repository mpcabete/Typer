import{Router} from '@reach/router'
import React from 'react'


import Home from '../app/appHome'
import Play from '../app/pages/play'
import Stats from '../app/pages/stats'
import Settings from '../app/pages/settings'


const MyRouter = ()=>{

    return(
        <>
        <Router>
            <Home path='app'>
                {/* play */}
                <Play path='/'/>
                <Stats path='stats'/>
                <Settings path='settings'/>
                {/* <LineChart path = 'stats'></LineChart> */}
            </Home>
        </Router>
        </>
    )
}

export default MyRouter
