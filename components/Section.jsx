import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Navigator } from '../utils/navigator.js'

var _ = require('lodash')
import velocityHelpers from 'velocity-react/velocity-helpers'

//import {SideBlock} from './SideBlock'

class Section extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    var node = ReactDOM.findDOMNode(this)
    this.elementBox=node.getBoundingClientRect()
    this.elementHeight = node.clientHeight
  }

  componentWillUpdate() {
    var node = ReactDOM.findDOMNode(this)
    // elementBox = this.props.node.getBoundingClientRect();
    // elementHeight = this.props.node.clientHeight;

    this.elementBox=node.getBoundingClientRect()
    this.elementHeight = node.clientHeight

    let url = Navigator.genURL(this.props.section_name || this.props.parentName)

    if(this.elementBox.top<=0  && this.elementBox.bottom>0 && location.hash!==url) {
      Navigator.setURL(this.props.section_name || this.props.parentName)

      // history.replaceState(null, null, urlId);
    }
  }

  render() {
    const { parentName, section_name, windowWidth, windowHeight,
            scollableBgColor, fixed_column, isOpen, className } = this.props

    var styles = _.cloneDeep(this.constructor.styles)
    var isSmallScreen = windowWidth<800


    if(scollableBgColor) styles.scrollable.backgroundColor = scollableBgColor
    styles.scrollable.minHeight = this.props.windowHeight

    //traditional classnames
    var sectionClass = [className]

    if(isSmallScreen) sectionClass.push('sm')
    if(this.props.isOpen) sectionClass.push('open')

    return(<section
      ref='sectionContainer'
      className={parentName}
      id={section_name}
      // {...this.props}
      style={{ ...styles.container,
        minHeight:windowHeight }}
        className={sectionClass.join(' ')}
        >
          {(fixed_column)?
            React.cloneElement(this.props.fixed_column,
              {
                height:windowHeight,
                isOpen:isOpen,
                elementBox: this.elementBox,
                elementHeight: this.elementHeight,
                isSmallScreen:isSmallScreen
              })
              : null
            }
            {
              (fixed_column)?
              <div style={styles.scrollable} className='scrollable-column'>
                {this.props.children}
              </div>
              :
              <div>
                {this.props.children}
              </div>
            }


          </section>)
        }
      }

      Section.propTypes = {
        'windowWidth':  PropTypes.number,
        'windowHeight':  PropTypes.number,
        'menuCloseSection':  PropTypes.bool,
        'projects':  PropTypes.array,
        'onProjectOpen':  PropTypes.func,
        'section_name':  PropTypes.string,
        'parentName':  PropTypes.string,
        'isOpen':  PropTypes.bool,
        'openItem':  PropTypes.string,
        'fixed_column':  PropTypes.object,
        'onCloseItem':PropTypes.func,
      }
      // {this.state.elementHeight} |
      // {this.this.state.elementBox.top} |
      // {this.state.elementHeight+this.this.state.elementBox.top}
      Section.animations = {
        open: (pos)=>{velocityHelpers.registerEffect({
          defaultDuration: 750,
          calls:
          [
            [{ translateX: buttonPosition.left, translateY: buttonPosition.top }],
            [{ translateX: buttonPosition.left, translateY: '180px' }]
          ]
        })
      }
    }

    Section.styles = {
      container:{
        position: 'relative',
        display: 'block'
      },
      scrollable:{
        position: 'relative',
        // width: '50%',
        // left: '50%',
        //transition: 'width .5s ease-in, left .5s ease-in',
        backgroundColor: 'white'
      },

    }

export default Section
