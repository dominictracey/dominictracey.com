import React from 'react'
import PropTypes from 'prop-types'
var _ = require('lodash')


 export class SideBlock extends React.Component {
   constructor(props) {
     super(props)

   }

   render() {

     const { isSmallScreen, elementBox, elementHeight, windowHeight, height, children } = this.props
     var styles = _.cloneDeep(this.constructor.styles)

     //const isSmallScreen = this.windowWidth<800 || isSmallScreen
     if(isSmallScreen) {
       styles.fixed.position = 'absolute'

       styles.scrollable.width = styles.fixed_content_container.width = '100%'
       styles.scrollable.left = 0
     } else {


       let isCurrent = elementBox && elementBox.top!==undefined
       && (
         elementBox.top <=0
         && elementHeight+elementBox.top>=0
         && elementHeight != windowHeight
       )
       let isAtEnd = elementBox && elementBox.bottom<windowHeight


      //  if(isOpen && !isSmallScreen) {
      //    var percRead = Math.min(100, Math.floor(
      //      -(
      //        (elementBox.top)/elementHeight
      //       )
      //        * 100
      //      ))
       //
      //  }

       //console.log(elementHeight, scrollTop, elementHeight+elementBox.top);
       if(!isCurrent || isAtEnd) {

         styles.fixed.position = 'absolute'

         // styles.readingIndicator.height=0;
         // styles.readingIndicator.display='none';
       }

       if(isAtEnd) {
         delete styles.fixed.top
         styles.fixed.bottom = 0
       }

     }


     return <div
       style={(!isSmallScreen) ? styles.fixed: null}
       className='fixed-column'
       >
       <div style={{
           height:height }}>
           <div
             className='fixed-column-container'
             style={styles.fixed_content_container}>
             {children}
           </div>


         </div>

       </div>
   }
}

SideBlock.propTypes = {
  isSmallScreen: PropTypes.bool,
  elementBox: PropTypes.object,
  elementHeight: PropTypes.number,
  windowHeight: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.node,
}

SideBlock.styles = {
  container:{
    position: 'relative',
    display: 'block'
  },
  fixed_content_container:{
    display:'flex',
    // justifyContent:'center',
    // alignItems:'center',
    height: '100%',
    color: 'white'
  },
  fixed:{
    position: 'fixed',
    top:0, left: 0,
    textAlign: 'center'
    // width:'50%'

  },
  scrollable:{
    position: 'relative',
    // width: '50%',
    // left: '50%',
    //transition: 'width .5s ease-in, left .5s ease-in',
    backgroundColor: 'white'
  },

}
