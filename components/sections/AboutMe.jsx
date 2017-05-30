import React from 'react'
import PropTypes from 'prop-types'
import Section from '../Section.jsx'
import Page from '../Page.jsx'
import SideBlock from '../SideBlock.jsx'

const AboutMe = (props) => {
  const { scrollTop, icon, title, subtitle, body } = props
  let h = scrollTop % 360 // Originally was hue 60,43%
  return(<Section
    // {...this.props}
    parentName = {this.constructor.displayName || constructor.name || undefined}
    fixed_column={
      <SideBlock
        // {...this.props}
      ><div style={{ color:'#000' }}>
      <div><i className={"icon-"+icon} style={{ color:'hsl('+h+', 63%, 90%)' }}/></div>
      <div className='section-title' >{title}</div>
      <div className='section-subtitle' dangerouslySetInnerHTML={{ __html:subtitle }}></div>
    </div>
  </SideBlock>
}
>
  <Page HTMLContent={body}/>

</Section>)

}

AboutMe.propTypes = {
  scrollTop: PropTypes.number,
  icon: PropTypes.string,
  title: PropTypes.string,
  subtitle:PropTypes.string,
  body: PropTypes.string,
}

export default AboutMe
