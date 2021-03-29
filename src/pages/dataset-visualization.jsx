import React, { useEffect, useState } from 'react';
import { interpolateRainbow,schemeSet3, scaleSequential } from 'd3'
import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout';
import SEO from '../components/seo';


const RWGenerator = () => {
  // console.log('render')
  // declara estados
  const [width, setWidth] = useState(0)
  const [colors, setColors] = useState(schemeSet3)
  const [hover, setHover] = useState('--')
  const [graphs, setGraphs] = useState(<></>)
  const [n, setN] = useState(4000)
  // const[mousePos,setMousePos] = useState([0,0])
  const[margin,setMargin] = useState([10,10,10,10])

  // pega dados com graphql usando um regex como filtro

  // const margin = 
  // top rigth bottom left
  const result = useStaticQuery(graphql`query MyQuery {
    wLists: allWordListsJson(filter: {lang: {regex: "/^(en|pt_br|es)/"}}) {
      nodes {
        lang
        list
        totalEntrys
      }
    }
  }  
  `)

  
  useEffect(() => {
    // pega largura
    const container = document.getElementById('rw-container')
    setWidth(container.clientWidth)
    // console.log('width: ', width)
  },[width])

  // useEffect(()=>{
  //   function handleMouseMove(e){setMousePos([e.pageX,e.pageY])}
  //   window.addEventListener('mousemove' , handleMouseMove)
  //   // return window.removeEventListener('mousemove',handleMouseMove)
  // },[])


  // useEffect(() => {
  //   // cria as cores aleatorias
  //   const colorScale = scaleSequential(interpolateRainbow)
  //   setColors([...new Array(n)].map(() => colorScale(Math.random())))
  // }, [n])


  // cria os grafico pra cada linguagem
  useEffect(() => {
    const getRects = (list, totalEntrys, n) => {
      let accumulator = 0

      // escala x
      const sumEntrys = list.slice(0, n).reduce((a, c) => a + parseInt(c[1]), 0) //(pra n menor q os 5k da lista)
      const xScale = scaleSequential().domain([0, totalEntrys]).range([0, width-margin[1]-margin[3]])/* 20 = margin*2 */

      const rects = []
      const frame = <rect
      key='frame-stroke'
      x='0'
      y='10'
      width={xScale(totalEntrys)}
      height='20'
      fill='none'
      stroke='white'
      strokeWidth='2'
      rx='5'
      ry='5'
      onMouseEnter={() => setHover(null)}
      />
      rects.push(frame)
      // pa cada palavra
      for (let i = 0; i < n; i++) {
        const [word, entrys] = list[i]

        // a cada 100 cria um retangulo da legenda
        if ((i + 1) % 100 === 0) {
          const legendBar = (
            <rect
              key={accumulator}
              x='0'
              y='0'
              width={xScale(accumulator)}
              height='5'
              // intercala preto e branco
              fill={(i + 1) % 200 === 0 ? 'black' : 'white'}
              stroke='black'
            />)

          rects.push(legendBar)
        }

        // retangulo da palavra
        const rect = (
          <rect
            key={word}
            x={xScale(accumulator)}
            y='10'
            width={Math.ceil(xScale(entrys))}
            height="20"
            fill={colors[i%colors.length]}
            onMouseEnter={() => setHover(word)}
          />)

        rects.push(rect)
        accumulator += parseInt(entrys)

      }
      const remainingWords = [
<rect
      key='remainingWordsLegend'
      x={xScale(accumulator)}
      y='0'
      width={xScale(totalEntrys-accumulator)}
      height='5'
      fill='#E5E2E0'
      stroke='black'
      onMouseEnter={() => setHover(`${50000-n} remaining words`)}
      />
      ,
<rect
      key='remainingWords'
      x={xScale(accumulator)}
      y='10'
      width={xScale(totalEntrys-accumulator)}
      height='20'
      fill='#E5E2E0'
      onMouseEnter={() => setHover(`${50000-n} remaining words`)}
      />]
      rects.push(...remainingWords)
      // reverse pra os retangulo criado por ultimo ficar em cima(principalmente da legenda)
      return (rects.reverse())
    }


    const graphs = result.wLists.nodes.map(({ list, lang, totalEntrys }) => (
      <div style={{backgroundColor:'#efecea',borderRadius:'5px'}} key={lang}>
        <h3>{lang}</h3>
        <svg width={width} height='50px'>
          <g transform={`translate(${margin[1]},${margin[0]})`/* margin */}>
          {getRects(list, totalEntrys, n)}
          </g>
        </svg>
      </div>
    ))

    setGraphs(graphs)
  }, [n, result, width, colors,margin])













  return (

    <Layout>
      <SEO title='Dataset Visualization' />
      <div id='rw-container' style={{ textAlign: 'center' }}>
        <h1>Dataset Visualization</h1>

        {graphs}

        <p>{hover}</p>
      </div>
      {/* <div className='wg-tooltip' 
      style={{
        position:'absolute',
        top:mousePos[1]-50,
        left:mousePos[0]-50,
        visibility:hover?'visible':'hidden'
        ,border:'solid'
        ,borderWidth:'1px'
        ,borderRadius:'5px'
        ,padding:'10px'
        ,backgroundColor:'white'
        }}>
      {hover}
      </div> */}
    </Layout>


  );


}

// TODO: 
// colocar essas lista em otra pasta, pq n precisa ser pego via api, dai ja muda a lang pro nome intero sepa
// ver viabilidade de transformar em post, ou criar o post com a pagina embedded
// pensar com cuidado nos estados e se eles sao renderizados no server
// dar 1 zoom
// arrumar o texto do taptaps


export default RWGenerator;

