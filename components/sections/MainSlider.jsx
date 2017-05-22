import React from 'react'
import * as d3 from 'd3'
import ReactFauxDOM from 'react-faux-dom'
import textures from 'textures'

var _ = require('lodash');
import {Section} from '../Section';

export class MainSlider extends React.Component{
  constructor(props){
    super(props);

  }

  render(){

    if (!this.props.windowWidth) return <div/>

    var styles = _.cloneDeep(this.constructor.styles);

    if (this.props.windowWidth < 800) {
      styles.headHoneycomb.textAlign = 'center';
      styles.headHoneycomb.width = 'auto';
      styles.headHoneycomb.marginLeft = 'auto';
      styles.headHoneycomb.borderLeft = 'none';
      styles.container.background = 'url(../assets/mini-me.jpg)'
      styles.container.backgroundSize = 'cover';
      styles.container.backgroundRepeat = 'no-repeat';
      delete styles.headMeta.top;
      styles.headMeta.bottom = 0;
      styles.headMeta.transform = 'translate(-50%,0)';

      styles.headContent.width = '100%'
      styles.headContent.height = '99.5%'
      styles.headContent.bottom = '0px'
      styles.headContent.top = '0px'
      
    }

    // textured box
    var node = ReactFauxDOM.createElement('div')
    var svg = d3.select(node)
     .append("svg")
     .classed("svgContent", true);

    var t = textures.paths()
     .d("hexagons")
     .size(8)
     .strokeWidth(1)
     .stroke("darkorange")

    svg.call(t);

    svg.append("rect")
     .attr("x", 0)
     .attr("y", 0)
     .attr("height", 3000)
     .attr("width", 3000)
     .style("fill", t.url())

    return(<Section
      {...this.props}

      >
        <div style={{...styles.container,
           minHeight:this.props.windowHeight}}>
      <div style={styles.overContainer} />

      <div style={styles.headMeta}>
        <div style={styles.headHoneycomb}>
             {node.toReact()}
        </div>
        <div style={styles.headContent} className='main_heading'>
        <h1 style={{fontSize:'2em', lineHeight: '2.60rem',color:'white', marginBottom:0}}
          dangerouslySetInnerHTML={{__html:this.props.headline}}></h1>
        <div dangerouslySetInnerHTML={{__html:this.props.body}}
             style={{fontSize:'1.2em', lineHeight:'1.2em', color:'white'}} />
      </div>
      </div>
      </div>


    </Section>)
  }
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
    paddingLeft: 20,
    paddingTop: 50,
    width:'34.8%',
    height:'97.5%',
    color: '#d0d0d0',
    background:'rgba(0, 0, 0, 0.51)',
    position: 'absolute',
    bottom: '5px',
    left: '5px',
  },
  headMeta:{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: '80%',

  }
}
