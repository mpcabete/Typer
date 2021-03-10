import{Router} from '@reach/router'
import React from 'react'

import Home from '../app/appHome'
const MyRouter = ()=>{

    return(
        <Router>
            <Home path='/app/'/>
        </Router>
    )
}

export default MyRouter
