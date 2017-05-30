import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { prefixLink } from 'gatsby-helpers'
import { TypographyStyle } from 'react-typography'
import typography from './utils/typography-lincoln'

const BUILD_TIME = new Date().getTime()

const Html = (props) => {

  const head = Helmet.rewind()

  let css
  if (process.env.NODE_ENV === 'production') {
    css = (
      <style
        dangerouslySetInnerHTML={{
          __html: require('!raw!./public/styles.css'),
        }}
      />
    )
  }

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='http://dominictracey.com' />
        <meta property='og:title' content='Dominic Tracey' />
        <meta property='og:image' content='http://dominictracey.com/assets/me.jpg' />
        <meta property='og:description'
          content='Dominic Tracey is a full stack developer and entreprenuer, based in Portland, Maine.' />
        <meta property='og:site_name' content='Dominic Tracey' />
        <meta property='og:locale' content='en_US' />

        <meta name='twitter:card' content='assets/me.jpg' />
        <meta name='twitter:site' content='@dominic_tracey' />
        <meta name='twitter:creator' content='@dominic_tracey' />
        <meta name='twitter:url' content='http://dominictracey.com' />
        <meta name='twitter:title' content='Dominic Tracey' />
        <meta name='twitter:description'
          content='Dominic Tracey is a full stack developer and entreprenuer, based in Portland, Maine.' />
        <meta name='twitter:image' content='http://dominictracey.com/assets/me.jpg' />
        {head.title.toComponent()}
        {head.meta.toComponent()}
        <TypographyStyle typography={typography} />
        {css}
      </head>
      <body>
        <div
          id='react-mount'
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        <script src={prefixLink(`/bundle.js?t=${BUILD_TIME}`)} />
      </body>
    </html>
  )
}


Html.propTypes = {
  body: PropTypes.string,
}

export default Html
