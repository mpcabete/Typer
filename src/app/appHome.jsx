import React, { Component } from 'react';
import { Link } from '@reach/router'

import Layout from '../components/layout';
import SEO from '../components/seo'

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
    title: "Settings"
  },]
class Home extends Component {
  state = {}
  render() {
    return (
      <>

        <Layout className="page" itens={MenuItens}>
          <SEO
            title='TapTap'
            description='Free web app for practicing touch typing, get faster and accurate with your keyboard'
          />
          {/* <AppNavigation/> */}
          {this.props.children}
        </Layout>
      </>
    );
  }
}

export default Home;