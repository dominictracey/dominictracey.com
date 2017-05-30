import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../less/site.less'
// import '../css/stripes.css';

class _template extends Component {

  constructor (props) {
    super(props)
  }

  componentDidMount() {
    (function(i,s,o,g,r,a,m) {i['GoogleAnalyticsObject']=r;i[r]=i[r]||function() {
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga')

    ga('create', 'UA-2626751-1', 'auto')
    ga('require', 'linkid')
    ga('send', 'pageview')
  }

  render () {
    return (
      <div className='site-container'>

        {this.props.children}

      </div>
    )
  }
}

_template.propTypes = {
  children: PropTypes.node,
}

export default _template
/*
<Container
  style={{
    maxWidth: 960,
    padding: `${rhythm(1)} ${rhythm(1/2)}`,
    paddingTop: 0,
  }}
>

</Container>
 */
