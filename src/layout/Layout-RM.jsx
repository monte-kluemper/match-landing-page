import React, { Component, useState, useEffect } from 'react'
import './w3.css'
import './raleway.css'

import fetchContent from './fetchContent'

//const items = () => fetchContent()
const toHref = da => da.fields.native.links[0].href
const taxonomyCatID = 'RMF-c-s-barcelona'
export default class Layout extends Component {
  render() {
    return (
      <div>
        <Body />
      </div>
    )
  }
}
const w100pct = { width: '100%' }
const w20pct = { width: '20%' }

//define Body component
const Body = () => (
  <div className='w3-white'>
    <div className='w3-content' style={{ maxWidth: '1400px' }}>
    <div class="header_schedule header_1200">
      <div class="header_1200_content">
        <div class="header_info_sponsors sponsors-0" data-morph="nav" data-morph-stack="15" data-morph-devices="tablet, mobile">
          <a href="http://www.emirates.com" class="header_info_sponsor" target="_blank" onclick="dataLayer.push({'eventCategory': dataLayer[0].pageHier,'eventAction': 'Header','event': 'header|logos','eventLabel': 'Emirates' });">
            <img alt="Emirates" src="https://www.realmadrid.com/cs/Satellite?blobcol=urldata&blobheader=image%2Fpng&blobkey=id&blobtable=MungoBlobs&blobwhere=1203388262780&ssbinary=true"/></a>
          <a href="https://www.adidas.co.uk/football" class="header_info_sponsor" target="_blank" onclick="dataLayer.push({'eventCategory': dataLayer[0].pageHier,'eventAction': 'Header','event': 'header|logos','eventLabel': 'Adidas' });">
            <img alt="Adidas" src="https://www.realmadrid.com/cs/Satellite?blobcol=urldata&amp;blobheader=image%2Fjpeg&amp;blobkey=id&amp;blobtable=MungoBlobs&amp;blobwhere=1203408965379&amp;ssbinary=true"/></a>
          </div>
        </div>
      </div>
      <div class="header_main_wrapper header_main_1200">
        <div class="header_logo original_logo" data-sticky-header-logo="https://www.realmadrid.com/StaticFiles/RealMadridResponsive/images/RM_sticky_logo.svg">
          <a href="/en" class="header_logo_link">
            <img id="headerLazo" class="header_lazo" src="https://www.realmadrid.com/StaticFiles/RealMadridResponsive/images/header_lazo.png" alt="Lazo" />
          </a>
          <h1 class="header_logo_title">
            <a href="/en" title="Real Madrid C.F." class="header_logo_link">
              <img src="https://www.realmadrid.com/StaticFiles/RealMadridResponsive/images/header_logo.svg" alt="Real Madrid C.F. - logo" class="hide_for_mobile hide_for_tablet" />
              <img src="https://www.realmadrid.com/StaticFiles/RealMadridResponsive/images/header_logo_mobile.svg" alt="Real Madrid C.F. - logo" class="hide_for_desktop" />
            </a>
          </h1>
        </div>
        <div class="navigation_tools navigation_tools_1200">
            <ul class="navigation_list">
            <li class="navlist_item navlist_item_right navlist_item_tool" data-morph="nav" data-morph-stack="9" data-morph-devices="tablet, mobile" data-morph-target="[role=navigation] > ul">
              <a href="/en/fans/madridistas/international" id="menu-neg-1">
                Get Tickets
              </a>
            </li>
            <li class="navlist_item navlist_item_right navlist_item_tool" data-morph="nav" data-morph-stack="9" data-morph-devices="tablet, mobile" data-morph-target="[role=navigation] > ul">
              <a href="/en/fans/madridistas/international" id="menu-neg-2">
                Online Access
              </a>
            </li>
            <li class="navlist_item navlist_item_right navlist_item_tool" data-morph="nav" data-morph-stack="9" data-morph-devices="tablet, mobile" data-morph-target="[role=navigation] > ul">
              <a href="/en/fans/madridistas/international" id="menu-neg-3">
                Join the Team
              </a>
            </li>
            </ul>
          </div>      </div>
      <header className='w3-container w3-center w3-padding-32'>
        <TopArea />
      </header>
      <div className='w3-row'>
        <div className='w3-col l12 m12 s12'>
          <h2>Latest Matchup News</h2>
        </div>
      </div>
      <div className='w3-row'>
        <div className='w3-col l12 m12 s12'>
          <Blogs />
        </div>
      </div>
      <br />
    </div>
    <Footer />
  </div>
)

// define Footer component
const Footer = () => (
  <footer className='w3-container w3-dark-grey w3-padding-32 w3-margin-top'>
    <p>
      Powered by <a
       href='https://www.oracle.com/middleware/technologies/content-experience-downloads.html'
       target='_blank'>Oracle CX Content
      </a> and <a
       href=''
       target='_blank'>ReactJS
      </a>
    </p>
  </footer>
)

class TopArea extends Component {
  constructor(props) {
    super(props)
    this.state = { banner: [] }
  }
  componentDidMount() {

    //type eq "Story" OR
    //AND taxonomies.categories.name eq "${taxonomyCatID}"
    fetchContent({ q: `type eq "Match-Hero-Header" AND taxonomies.categories.apiName eq "${taxonomyCatID}" AND language eq "en"` }).then(data => {
      console.log(data)

      const banner = data.items.filter(
        item => item.type === 'Match-Hero-Header'
      )
      console.log(banner);
      this.setState({ banner: banner })
      console.log(this);
    })
      .catch(err => {
        console.error(err)
        this.setState({ err: err.toString() })
      })
  }
  render() {
    const child = this.state.err ? (
      <ErrorComponent err={this.state.err} />
    ) : this.state.banner.length === 0 ? (
      <NoItems />
    ) : (
          <Banner item={this.state.banner[0]} />)
    return child
  }
}
const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const [err, setErr] = useState(false)
  useEffect(() => {
    fetchContent({ q: `type eq "Story" AND taxonomies.categories.apiName eq "${taxonomyCatID}" AND language eq "en"` })
      .then(data => {
        const blogs = data.items
        console.log(blogs)
        setBlogs(blogs)
      })
      .catch(err => {
        console.error(err)
        setErr({ err: err.toString() })
      })
  }, [])
  const child = err ? (
    <ErrorComponent err={this.state.err} />
  ) : blogs.length === 0 ? (
    <NoItems />
  ) : (
        <List items={blogs} />)
  return child
}

const ErrorComponent = props => <div>{props.err}</div>

const NoItems = () => <div>No items to display</div>

const List = props => {
  console.log(props);
  return (
    <div>
      {props.items.map((item, index) => (
        <Blog key={index} item={item} />
      ))}
    </div>
  )
}

const dateToMDY = date =>
  new Date(date.value).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })

// definition for Blog component
const Blog = ({ item }) => {
  console.log(item);
  const { fields } = item
  const {
    author,
    media,
    publishDate,
    subtitle
  } = fields
  // const content = { __html: body } // to be used with dangerouslySetInnerHTML
  const image = toHref(media)
  const date = dateToMDY(publishDate)

  return (
    <div className='w3-col l4 m6 s12 w3-margin w3-white' style={{ maxWidth: '430px' }}>
      <img src={image} alt={item.name} style={w100pct} />
      <div className='w3-container'>
        <h3>
          <b>{item.name}</b>
        </h3>
        <h5>
          {author}, <span className='w3-opacity'>{date}</span>
        </h5>
      </div>

      <div className='w3-container'><p>{subtitle}</p></div>
    </div>
  )
}

// definition for Banner component
const Banner = ({ item }) => {
  const { fields } = item
  const {
    team_1_name,
    team_1_logo,
    team_2_name,
    team_2_logo,
    match_date_time,
    media,
    score
  } = fields

  const team_1_logo_url = toHref(team_1_logo)
  const team_2_logo_url = toHref(team_2_logo)
  const banner_url = toHref(media)
  const date_time = dateToMDY(match_date_time)

  return (
    <div class="full_section m_destacados_home">
      <div className='w3-centered'>
        <div class="m_full_header_banner2">
          <div class="m_full_header_banner_info_wrapper">
            <img width="1500" alt={item.name} src={banner_url} />
            <div class="m_full_header_banner_info">
              <div class="wrapper">
                <div class="m_dest_home_content">
                  <img src={team_2_logo_url} alt={item.name} style={w20pct} className='w3-show-inline-block' />
                  <div class="m_dest_home_tipo">{date_time}</div>
                  <h2><a href="">{team_2_name}</a></h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w3-row'>
        <div className='w3-col l12 m12 s12'>
          <h4>{score}</h4>
        </div>
      </div>
    </div>
    )
}
