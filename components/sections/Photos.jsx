import React, {Component} from 'react'
import {Section} from '../Section.jsx'
import PictureGallery from '../PictureGallery.jsx'
import 'whatwg-fetch'
import _ from 'lodash'
import { css, StyleSheet } from 'aphrodite/no-important'
import {SideBlock} from '../SideBlock.jsx'

const cloudinaryBaseUrl = 'http://res.cloudinary.com/'
const cloudinaryCloudName = 'dominictracey/'
const cloudinaryTagFragment = 'image/list/'
const cloudinaryImageFragment = 'image/upload/a_exif/'
const cloudinaryAlbums = ['tango','climbing','family']

class Photos extends Component  {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    // create an object with keys as album names and values being an array of image names
    const _this = this
    cloudinaryAlbums.map(function(album, i) {
      _this.getListByFolder(album)
    })
  }

  getListByFolder = (folder) => {
    const retval = []
    const _this = this
    fetch(cloudinaryBaseUrl + cloudinaryCloudName + cloudinaryTagFragment + folder + '.json')
    .then((res)=>{
      return res.json();
    }).
    then((json_res)=>{
      const newAlbum = {}
      newAlbum[folder] = json_res
      const populatedAlbum = _this.buildGallery(newAlbum[folder])
      const obj = {}
      obj[folder] = populatedAlbum
      _this.setState(Object.assign({}, ...this.state, obj))
    })
    .catch(function(ex) {
      console.log('parsing failed', ex)
    });

    return retval
  }

  getCloudinaryUri = (image) => {
    // http://res.cloudinary.com/dominictracey/image/upload/v1495214231/tango/14435233_10157779381190001_5920112255922826196_o_1.jpg
    if (!!image) {
      //return cloudinaryBaseUrl + cloudinaryCloudName + cloudinaryImageFragment + 'v' + image.version + '/' + image.public_id + '.' + image.format
      //http://res.cloudinary.com/dominictracey/image/upload/a_exif
      return `${cloudinaryBaseUrl}${cloudinaryCloudName}${cloudinaryImageFragment}v${image.version}/${image.public_id}.${image.format}`
    } else {
      return ``
    }
  }

  getCloudinaryThumbnail = (image) => {
    //http://res.cloudinary.com/dominictracey/image/upload/c_scale,w_263/v1495214231/tango/14435233_10157779381190001_5920112255922826196_o_1.jpg
    if (!!image) {
      return `${cloudinaryBaseUrl}${cloudinaryCloudName}${cloudinaryImageFragment}c_scale,w_240/v${image.version}/${image.public_id}.${image.format}`
    } else {
      return ``
    }
  }

  getCloudinarySrcSet = (image, size) => {
    //http://res.cloudinary.com/dominictracey/image/upload/c_scale,w_1024/1495214…w_320/1495214280/tango/13227370_1356785671002054_7085504404868109947_o.jpg
    // good: http://res.cloudinary.com/dominictracey/image/upload/c_scale,w_1024/v1495214231/tango/14435233_10157779381190001_5920112255922826196_o_1.jpg
    // badd: http://res.cloudinary.com/dominictracey/image/upload/c_scale,w_1024/1495214313/tango/11822621_10101149219042634_1349847227206266514_n.jpg
    if (!!image) {
      return `${cloudinaryBaseUrl}${cloudinaryCloudName}${cloudinaryImageFragment}c_scale,w_${size}/v${image.version}/${image.public_id}.${image.format}`
    } else {
      return ``
    }
  }

  // when we have pulled the raw info from Cloudinary, we have a state that looks like:
  // {
  //    tango: {
  //      resources: [ ...images ]
  //    }
  // }
  // after this, we have our gallery info all set up:
  // {
  //    tango: {
  //        resources: [ ...images ]}
  //        gallery: [{
  //          src: 'htp://res.cl ...'
  //          thumbnail: ''
  //          ...
  //        },
  //      ]
  //    }
  // }
  buildGallery = (album) => {

    var gallery = []
    album.resources.map((image) => {
      const caption = image.context && image.context.custom && image.context.custom.caption ? image.context.custom.caption : ''
      const alt = image.context && image.context.custom && image.context.custom.alt ? image.context.custom.alt : 'photo'
      const img = {
        src: this.getCloudinaryUri(image),
        thumbnail: this.getCloudinaryThumbnail(image),
        caption: caption,
        alt: alt,
        // srcset: [
        //   this.getCloudinarySrcSet(image, 1024),
        //   this.getCloudinarySrcSet(image, 800),
        //   this.getCloudinarySrcSet(image, 500),
        //   this.getCloudinarySrcSet(image, 320),
        // ],
      }
      gallery.push(img)
    })
    return Object.assign({}, album, {gallery: gallery})
  }

  render() {
    const { scrollTop, icon, title, subtitle } = this.props

    if (_.isEmpty(this.state)) { return null }

    let h = this.props.scrollTop % 360; // Originally was hue 60,43%
    //const album = this.state.tango.gallery

    return(
      <Section {...this.props}
        // parentName = {this.constructor.displayName || constructor.name || undefined}
        fixed_column={<SideBlock {...this.props}><div style={{color:'#fff'}}>
          <div><i className={"icon-"+icon} style={{color:'#E54C53'}}/></div>
          <div className="section-title" >{title}</div>
          <div className='section-subtitle' dangerouslySetInnerHTML={{__html:subtitle}}></div>
          </div>
          </SideBlock>
        }
      >
        {Object.keys(this.state).map( (key) => {
          return (
            <div className={css(classes.gallery)} key={key}>
              <PictureGallery images={this.state[key].gallery} theme={theme} showThumbnails heading={key}/>
            </div>)
        })}
    </Section>)
  }

}

// const THEMED_IMAGES = [
// 	{ id: '1471101173712-b9884175254e', caption: 'Photo by Pedro Lastra', orientation: 'square', useForDemo: true }, // https://unsplash.com/photos/5oRzZU5uwSM (Dragonfly)
// 	{ id: '1471127432458-65206be149c9', caption: 'Photo by Ernesto Velázquez', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/Kpgt4pl03O0 (Deer)
// 	{ id: '1470777639313-60af88918203', caption: 'Photo by Cris Saur', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/GNUcUx-iObg (Koala)
// 	{ id: '1453550486481-aa4175b013ea', caption: 'Photo by Benjamin Pley', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/WiSeaZ4E6ZI (Elephant)
// 	{ id: '1415904663467-dfdc16cae794', caption: 'Photo by Levi Saunders', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/NUMlxTPsznM (Coyote)
// ];
// const THUMBNAIL_IMAGES = [
// 	{ id: '1454991727061-be514eae86f7', caption: 'Photo by Thomas Kelley', orientation: 'square', useForDemo: true }, // https://unsplash.com/photos/t20pc32VbrU (Hump Back Whale)
// 	{ id: '1455717974081-0436a066bb96', caption: 'Photo by Teddy Kelley', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/cmKPOUgdmWc (Deer)
// 	{ id: '1460899960812-f6ee1ecaf117', caption: 'Photo by Jay Ruzesky', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/h13Y8vyIXNU (Walrus)
// 	{ id: '1456926631375-92c8ce872def', caption: 'Photo by Gwen Weustink', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/I3C1sSXj1i8 (Leopard)
// 	{ id: '1452274381522-521513015433', caption: 'Photo by Adam Willoughby-Knox', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/_snqARKTgoc (Mother and Cubs)
// 	{ id: '1471145653077-54c6f0aae511', caption: 'Photo by Boris Smokrovic', orientation: 'landscape' }, // https://unsplash.com/photos/n0feC_PWFdk (Dragonfly)
// 	{ id: '1471005197911-88e9d4a7834d', caption: 'Photo by Gaetano Cessati', orientation: 'landscape' }, // https://unsplash.com/photos/YOX8ZMTo7hk (Baby Crocodile)
// 	{ id: '1470583190240-bd6bbde8a569', caption: 'Photo by Alan Emery', orientation: 'landscape' }, // https://unsplash.com/photos/emTCWiq2txk (Beetle)
// 	{ id: '1470688090067-6d429c0b2600', caption: 'Photo by Ján Jakub Naništa', orientation: 'landscape' }, // https://unsplash.com/photos/xqjO-lx39B4 (Scottish Highland Cow)
// 	{ id: '1470742292565-de43c4b02b57', caption: 'Photo by Eric Knoll', orientation: 'landscape' }, // https://unsplash.com/photos/DmOCkOnx-MQ (Cheetah)
// 	// https://unsplash.com/photos/NUMlxTPsznM coyote?
// ];

const classes = StyleSheet.create({
  gallery: {
    paddingLeft: '20px',
    lineHeight: '1em',
  },
  title: {

  },
})

const theme = {
	// container
	container: { background: 'rgba(255, 255, 255, 0.9)' },

	// arrows
	arrow: {
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		fill: '#222',
		opacity: 0.6,
		transition: 'opacity 200ms',

		':hover': {
			opacity: 1,
		},
	},
	arrow__size__medium: {
		borderRadius: 40,
		height: 40,
		marginTop: -20,

		'@media (min-width: 768px)': {
			height: 70,
			padding: 15,
		},
	},
	arrow__direction__left: { marginLeft: 10 },
	arrow__direction__right: { marginRight: 10 },

	// header
	close: {
		fill: '#D40000',
		opacity: 0.6,
		transition: 'all 200ms',

		':hover': {
			opacity: 1,
		},
	},

	// footer
	footer: {
		color: 'black',
	},
	footerCount: {
		color: 'rgba(0, 0, 0, 0.6)',
	},

	// thumbnails
	thumbnail: {
	},
	thumbnail__active: {
		boxShadow: '0 0 0 2px #00D8FF',
	},
};

export default Photos
