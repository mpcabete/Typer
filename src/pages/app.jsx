import{Router,Link} from '@reach/router'
import React from 'react'
import Stats from '../app/pages/stats'
import Home from '../app/appHome'
const MyRouter = ()=>{

    return(
        <>
        <Router>
            <Home path='/app/'/>
        </Router>
        </>
    )
}

export default MyRouter
