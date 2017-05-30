import React from 'react'
import PropTypes from 'prop-types'
import Project from '../Project.jsx'
import Section from '../Section.jsx'
import SideBlock from '../SideBlock.jsx'
import { Navigator } from '../../utils/navigator.js'

import VelocityTransitionGroup from 'velocity-react/velocity-transition-group'

export default class ProjectList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isProjectSelected: false,
      currentProject: ''
    }

    this.handleSelectProject = this.handleSelectProject.bind(this)

  }
  // componentDidUpdate() {
  // var node = ReactDOM.findDOMNode(this);
  // //console.log(node.scrollTop, node.scrollHeight, node.getBoundingClientRect());
  // //this.setState({...node.getBoundingClientRect()});
  // //node.scrollTop = node.scrollHeight;
  // }

  scrollToSectionTop() {
    //var node = ReactDOM.findDOMNode(this)
    //var elementBox = node.getBoundingClientRect()
    //window.scroll(0, elementBox.top);
  }

  handleSelectProject(e, currentProject)  {
    const { section_name, onProjectOpen } = this.props

    // if (window.isMobile) {
    //   await Navigator.scrollTo(currentProject.id)
    // } else {
    //   await Navigator.scrollTo(section_name)
    // }

    this.setState({
      isProjectSelected: true,
      currentProject : currentProject
    })


    onProjectOpen(e,currentProject)
  }

  handleGoToProject(pid) {
    Navigator.scrollTo(pid)
  }

  handleCloseProject() {
    // if (window.isMobile) {
    //   await Navigator.scrollTo(this.state.currentProject.id)
    // } else {
    //   await Navigator.scrollTo(this.props.section_name)
    // }

    this.setState({
      isProjectSelected:false,
      currentProject:''
    })

  }

  render() {
    const { section_name, projects } = this.props

    //var isSmallScreen = this.windowWidth<800 || this.props.isSmallScreen

    let opensource = []
    projects.map((project, i)=>{
      let projectId = Navigator.genId([section_name,project.data.title])
      if(project.data.type.toLowerCase() == 'opensource') {
          if(opensource.length !== 0) opensource.push(<span className='middotDivider'
          key={opensource.length+1}></span>)
          opensource.push(<span
            style={{ cursor:'pointer', textDecoration:'underline' }}
            onClick={this.handleGoToProject.bind(this, projectId)}
            key={project.data.title+i}>{project.data.title}</span>)
      }
      if(!this.state.isProjectSelected) {
        return (<Project {...project}
          id={projectId}
          onClick={this.handleSelectProject.bind(this)}
          key={project.data.title}/>)
      }

      if(this.state.isProjectSelected && this.state.currentProject
        && project.data.title == this.state.currentProject.title) {
        return (<Project {...project}
          id={projectId}
          onClose={this.handleCloseProject.bind(this)}
          currentProject = {project.data.title == this.state.currentProject.title}
          isProjectSelected = {this.state.isProjectSelected}
          onClick={this.handleSelectProject.bind(this)}
          key={project.data.title}/>)
        }
      })

    return(<Section
      // {...this.props}
      parentName = {this.constructor.displayName || constructor.name || undefined}
      isOpen={this.state.isProjectSelected}
      openItem = {this.state.currentProject}
      fixed_column={<SideBlock {...this.props}>
        <div>
          <div><i className='icon-cup' style={{ color:'#7fd093' }}/></div>
        <div className='section-title' >Work</div>
      <div className='section-subtitle'>Curious & Tenacious</div>
        </div>
        {(!this.state.isProjectSelected)?
        <div className='section-menu-item'>
          <i className='icon-social-github'/>
          <div className='inner'>
            <div >There is lots of my code on Github:
            </div>
            {/* <div className='item-anchors'>{opensource}</div> */}
            <div className='inner'><a href='http://github.com/dominictracey'>github.com/dominictracey</a></div>
          </div>
          </div>
          : null
          }

      </SideBlock>
      }
      onCloseItem={this.handleCloseProject.bind(this)}
      >
      <div style={{ borderBottom:'5px solid #0C1926' }} className='striped-bg'>

        <VelocityTransitionGroup enter={{ animation: "slideDown" }} leave={{ animation: "slideUp" }}>
          {projects}
  </VelocityTransitionGroup>

      </div>
    </Section>)
  }
}

ProjectList.propTypes = {
  //isSmallScreen: PropTypes.bool,
  section_name: PropTypes.string,
  projects: PropTypes.array,
}
