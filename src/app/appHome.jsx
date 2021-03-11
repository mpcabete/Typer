import React, { Component } from 'react';
import Play from './pages/play'
import Navigation from '../components/layout'
import Layout from '../components/layout';

class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <>
        <Layout className="page">

        <Play/>
        </Layout>
        </>
         );
    }
}
 
export default Home;