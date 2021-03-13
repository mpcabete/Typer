import React, { Component } from 'react';
import Play from './pages/play'
import Navigation from '../components/layout'
import Stats from '../app/pages/stats'
import Layout from '../components/layout';

class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <>
        <Layout className="page">
        <Play/>
        <Stats/>
        </Layout>
        </>
         );
    }
}
 
export default Home;