import React from 'react'
import PropTypes from 'prop-types'
// import 'css/markdown-styles.css'
//
// module.exports = React.createClass({
//   propTypes () {
//     return {
//       router: React.PropTypes.object,
//     }
//   },
//   render () {
//     const post = this.props.route.page.data
//     return (
//       <div className="markdown">
//         <h1>{post.title}</h1>
//         <div dangerouslySetInnerHTML={{ __html: post.body }} />
//       </div>
//     )
//   },
// })

const MarkdownWrapper = (props) => {
  const post = props.route.page.data

  return (
    <div className='markdown'>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.body }}/>
    </div>
  )
}

MarkdownWrapper.propTypes = {
  route: PropTypes.object,
}
