import React, { Component } from 'react';
import{ Link } from '@reach/router'

import Layout from '../components/layout';

const MenuItens = [
    {
      path: "/",
      title: "Home"
    },
    {
        path: "/app",
        title: "Play"
      },
      {
        path: "/app/stats",
        title: "Stats"
      },
      {
        path: "/app/settings",
        title: "Setings"
      },]
class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <>
            
        <Layout className="page" itens = {MenuItens}>
        {/* <AppNavigation/> */}
        {this.props.children}
        </Layout>
        </>
         );
    }
}
 
export default Home;