import React from 'react'
import PropTypes from 'prop-types'

const Page = (props) => {
  const { HTMLContent } = props

  if(React.Children.count(this.props.children)) {
    return(<div className='page'>
      <div dangerouslySetInnerHTML={{ __html:HTMLContent }}></div>
      {/* {this.props.children} */}
    </div>)
  }
  return(<div className='page' dangerouslySetInnerHTML={{ __html:HTMLContent }}></div>)
}

Page.propTypes = {
  HTMLContent: PropTypes.string,
}

Page.styles = {
  page:{
    padding: 20
  }
}
