import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import ReactFauxDOM from 'react-faux-dom'
import textures from 'textures'

var _ = require('lodash')
import { Section } from '../Section'

export default class MainSlider extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { windowWidth, windowHeight, headline, body } = this.props
    if (!windowWidth) return <div/>

    var styles = _.cloneDeep(this.constructor.styles)

    if (windowWidth < 1050) {
      styles.headHoneycomb.textAlign = 'center'
      styles.headHoneycomb.width = 'auto'
      styles.headHoneycomb.marginLeft = 'auto'
      //styles.headHoneycomb.borderLeft = 'none';
      if (windowWidth < 800) {
        styles.container.background = 'url(../assets/mini-me.jpg)'
      }
      styles.container.backgroundSize = 'cover'
      styles.container.backgroundRepeat = 'no-repeat'
      delete styles.headMeta.top
      styles.headMeta.bottom = 0
      styles.headMeta.transform = 'translate(-50%,0)'

      styles.headContent.width = '100%'
      styles.headContent.height = '99.5%'
      styles.headContent.bottom = '0px'
      styles.headContent.top = '0px'
      styles.headContent.marginLeft = '0px'
    }

    // textured box
    var node = ReactFauxDOM.createElement('div')
    var svg = d3.select(node)
    .append("svg")
    .classed("svgContent", true)

    var t = textures.paths()
    .d("hexagons")
    .size(8)
    .strokeWidth(1)
    .stroke("darkorange")

    svg.call(t)

    svg.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", 3000)
    .attr("width", 3000)
    .style("fill", t.url())

    return(
      <Section
        // {...this.props}
        >
          <div style={{ ...styles.container,
            minHeight:windowHeight }}>
            <div style={styles.overContainer} />

            <div style={styles.headMeta}>
              <div style={styles.headHoneycomb}>
                {node.toReact()}
              </div>
              <div style={styles.headContent} className='main_heading'>
                <h1 style={styles.headName}
                  dangerouslySetInnerHTML={{ __html: headline }}></h1>
                  <div dangerouslySetInnerHTML={{ __html: body }}
                    style={styles.headTagline} />
                  </div>
                </div>
              </div>


            </Section>)
          }
        }

        MainSlider.propTypes = {
          windowWidth: PropTypes.number,
          windowHeight: PropTypes.number,
          headline: PropTypes.string,
          body: PropTypes.string,
        }
        MainSlider.styles = {
          container:{
            position: 'relative',
            background:'url(../assets/me.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize:'cover'
          },
          overContainer:{
            position: 'absolute',
            width:'100%', height:'100%',
            //border: '15px solid rgba(29, 15, 32, 0.43)',
          },
          headHoneycomb:{
            marginLeft:'65%',
            padding: 0,
            color: '#d0d0d0',
            borderLeft: '5px solid #fbbf69',
            borderBottom: '5px solid #fbbf69',
            background:'rgba(0, 0, 0, 0.27)',
          },
          headContent: {
            marginLeft:'65%',
            //paddingLeft: 20,
            //paddingTop: 50,
            width:'35%',
            height:'100%',
            color: '#d0d0d0',
            background:'rgba(0, 0, 0, 0.51)',
            position: 'absolute',
            bottom: '0px',
            //left: '5px',
          },
          headMeta:{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '80%',
          },
          headName:{
            fontSize:'2em',
            lineHeight: '2.60rem',
            color:'white',
            marginBottom:0,
            paddingTop:'20px',
            paddingLeft:'20px',
          },
          headTagline:{
            fontSize:'1.2em',
            lineHeight:'1.2em',
            color:'white',
            paddingLeft:'40px',
          },
        }
