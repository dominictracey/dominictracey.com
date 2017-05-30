import React, { Component } from 'react'
import PropTypes from 'prop-types'
//import access from 'safe-access'
import Lightbox from 'react-images'
import { css, StyleSheet } from 'aphrodite/no-important'
import Masonry from 'react-masonry-component'

class PictureGallery extends Component {
  constructor () {
    super()

    this.state = {
      lightboxIsOpen: false,
      currentImage: 0,
    }

    this.closeLightbox = this.closeLightbox.bind(this)
    this.gotoNext = this.gotoNext.bind(this)
    this.gotoPrevious = this.gotoPrevious.bind(this)
    this.gotoImage = this.gotoImage.bind(this)
    this.handleClickImage = this.handleClickImage.bind(this)
    this.openLightbox = this.openLightbox.bind(this)
  }

  openLightbox (index, event) {
    event.preventDefault()
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    })
  }
  closeLightbox () {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    })
  }
  gotoPrevious () {
    this.setState({
      currentImage: this.state.currentImage - 1,
    })
  }
  gotoNext () {
    this.setState({
      currentImage: this.state.currentImage + 1,
    })
  }
  gotoImage (index) {
    this.setState({
      currentImage: index,
    })
  }
  handleClickImage () {
    if (this.state.currentImage === this.props.images.length - 1) return

    this.gotoNext()
  }
  renderGallery () {
    // const { images } = this.props;
    //
    // if (!images) return;
    //
    // const gallery = images.map((obj, i) => {
    //   return (
    //     <a
    //       href={obj.src}
    //       className={css(classes.thumbnail, classes[obj.orientation])}
    //       key={i}
    //       onClick={(e) => this.openLightbox(i, e)}
    //     >
    //       <img src={obj.thumbnail} className={css(classes.source)} />
    //     </a>
    //   );
    // });
    //
    // return (
    //   <div className={css(classes.gallery)}>
    //     {gallery}
    //   </div>
    // );


    var masonryOptions = {
      transitionDuration: 0
    }

    const _this = this
    var childElements = this.props.images.map(function(element, i) {
      return (
        <div className='image-element-class' key={i}>
          <a href={element.src}
            className={css(classes.thumbnail, classes[element.orientation])}
            onClick={(e) => _this.openLightbox(i, e)}>
            <img src={element.thumbnail} />
        </a>
      </div>
    )
  })

  return (
    <Masonry
      className={css(classes.gallery)} // default ''
      elementType={'div'} // default 'div'
      options={masonryOptions} // default {}
      disableImagesLoaded={false} // default false
      updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
      >
        {childElements}
      </Masonry>
    )

  }
  render () {
    const { images, heading, subheading, showThumbnails, theme } = this.props
    if (!images) return null

    return (
      <div className='section'>
        {heading && <h2>{heading}</h2>}
        {subheading && <p>{subheading}</p>}
        {this.renderGallery()}
        <Lightbox
          currentImage={this.state.currentImage}
          images={images}
          isOpen={this.state.lightboxIsOpen}
          onClickImage={this.handleClickImage}
          onClickNext={this.gotoNext}
          onClickPrev={this.gotoPrevious}
          onClickThumbnail={this.gotoImage}
          onClose={this.closeLightbox}
          showThumbnails={showThumbnails}
          theme={theme}
        />
      </div>
    )
  }
}

PictureGallery.displayName = 'Gallery'
PictureGallery.propTypes = {
  heading: PropTypes.string,
  images: PropTypes.array,
  showThumbnails: PropTypes.bool,
  subheading: PropTypes.string,
  theme: PropTypes.object,
}

const gutter = {
  small: 2,
  large: 4,
}
const classes = StyleSheet.create({
  gallery: {
    marginRight: -gutter.small,
    overflow: 'hidden',
    display: 'flex',
    flexWrap: 'wrap',
    '@media (min-width: 500px)': {
      marginRight: -gutter.large,
    },
  },

  // anchor
  thumbnail: {
    paddingRight: gutter.small,
    paddingBottom: gutter.small,
    '@media (min-width: 500px)': {
      paddingRight: gutter.large,
      paddingBottom: gutter.large,
    },
  },

  // orientation
  landscape: {
    width: '30%',
  },
  square: {
    paddingBottom: 0,
    width: '40%',

    '@media (min-width: 500px)': {
      paddingBottom: 0,
    },
  },

  // actual <img />
  source: {
    border: 0,
    display: 'block',
    height: 'auto',
    maxWidth: '100%',
    width: 'auto',
  },
})

export default PictureGallery
