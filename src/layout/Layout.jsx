import React, { Component, useState, useEffect } from 'react'
import './w3.css'
import './raleway.css'

import fetchContent from './fetchContent'

//const items = () => fetchContent()
const toHref = da => da.fields.native.links[0].href
const taxonomyCatName = 'Game Highlights'
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
  <div className='w3-light-grey'>
    <div className='w3-content' style={{ maxWidth: '1400px' }}>
      <header className='w3-container w3-center w3-padding-32'>
        <TopArea />
      </header>
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
      Powered by{' '}
      <a href='https://www.w3schools.com/w3css/default.asp'>
        w3.css
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
    //AND taxonomies.categories.name eq "${taxonomyCatName}"
    fetchContent({ q: `type eq "Match-Hero-Header"` }).then(data => {
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
    fetchContent({ q: `type eq "Story" AND taxonomies.categories.name eq "${taxonomyCatName}"` })
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
    <div className="w3-col">
      <div className='w3-centered'>
        <h3>{date_time}</h3>
      <div className='w3-col l4 m6'>
        <img src={team_1_logo_url} alt={item.name} style={w20pct} className='w3-show-inline-block' />
        <span>{team_1_name}</span>
      </div>
      <div className='w3-col l4 m6'>{score}</div>
      <div className='w3-col l4 m6'>
        <img src={team_2_logo_url} alt={item.name} style={w20pct} className='w3-show-inline-block' />
        <span>{team_2_name}</span>
      </div>
      <img src={banner_url} alt={item.name} />
      </div>
    </div>
  )
}