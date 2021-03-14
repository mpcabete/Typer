/** @jsx jsx */
import { jsx } from "theme-ui"
import { useStaticQuery, graphql } from "gatsby"


import Header from "./header"
import Logo from "./logo"
import Navigation from "./navigation";

import "../assets/scss/style.scss"
import Footer from "./footer";
import Theme from "../components/theme"


const query = graphql`
query LayoutQuery {
  site {
    siteMetadata {
      siteTitle: title
    }
  }
}
`



const Layout = ({children, className, props, itens}) => {

  const MenuItems = itens ?? [
    {
      path: "/",
      title: "Home"
    },
    {
      path: "/app",
      title: "Play"
    },
    
    {
      path: "/about",
      title: "About"
    },
    {
      path: "/blog",
      title: "Blog"
    },
    {
      path: "/contact",
      title: "Contact"
    },
  ]

  const { site } = useStaticQuery(query)
  const { siteTitle } = site.siteMetadata


  return (
    <div className="primary-container">
      <Header>
        <Logo title={siteTitle} />
        <Navigation itens = {MenuItems}/>
        <div sx={layoutStyle.theme}>
          <Theme/>
        </div>
      </Header>
      <main className={"container " + className}>
        {children}
      </main>
      <Footer/>
    </div>
  )
}

export default Layout

const layoutStyle = {
  theme: {
    display:["none", "none", "none", "block"],
  }
}