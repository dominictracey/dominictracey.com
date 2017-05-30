import React from 'react'
import PropTypes from 'prop-types'
import Section from '../Section.jsx'
import Page from '../Page.jsx'

import SideBlock from '../SideBlock.jsx'
//import {Signature} from '../Signature.jsx';

const Contact = (props) => {
  const { title, subtitle, body } = props
  return(<Section
    // {...this.props}
    parentName = {this.constructor.displayName || constructor.name || undefined}
    fixed_column={
      <SideBlock
        // {...this.props}
        >
        <div >
        <div><i className={"icon-phone"} style={{ color:'#f1f1db' }}/></div>
      <div className='section-title' >{title}</div>
    <div className='section-subtitle' dangerouslySetInnerHTML={{ __html:subtitle }}></div>
        </div>
        </SideBlock>
      }
    >

    <Page HTMLContent={body}>

    </Page>
    {/*<Signature  color='#000000' height={150}
      style={{position:'absolute', bottom:30, left:0, right:0, display:'flex',
      flexDirection:'column', alignItems:'center'}}/>*/}

  </Section>)

}

Contact.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  body: PropTypes.string,
}

export default Contact
