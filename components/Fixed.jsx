import React from 'react'
import PropTypes from 'prop-types'

var _ = require('lodash')

const Fixed = (props) => {

  const { children } = props

  var styles = _.cloneDeep(this.constructor.styles)

  return(<div style={styles.container}>{children}</div>)
}


Fixed.propTypes = {
  children: PropTypes.node,
}

Fixed.styles = {
  container:{
    position: 'fixed',
    width: '50%'
  }
}

export default Fixed
