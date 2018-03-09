import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { OverlayTrigger, Tooltip, InputGroup, Carousel, Thumbnail, Table, FormGroup, FormControl, ControlLabel, Button, Navbar, Nav, Grid, Row, Col } from 'react-bootstrap'



const notiStyle = {
  color: 'green',
  fontStyle: 'italic',
  fontSize: 15,
  borderStyle: 'solid',
  borderWidth: 2,
  paddingLeft: 20,
  borderRadius: 20,
  paddingTop: 10,
  lineHeight: 1

}

const menuStyle ={
  fontSize: 20,
  backgroundColor: 'lightgrey',
  lineHeight: 3
}
const linkStyle ={
  fontWeight: 'bold',
  color:'red',
  backgroundColor: 'lightblue',
  borderRadius: 15,
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft:2
}
const hideWhen = (message) => {
  if(message === '')
  return {
    display: 'none'
  }
  
}
const Menu = ({anecs, addnew, anecdoteById, message}) => (
    
  <div>  
    <Router>
      <div>
        <div style={menuStyle}> 
        <Navbar inverse collapseOnSelect>
  <Navbar.Header>
    <Navbar.Brand>
      <p style={italic}>Anecdote app</p>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav>
          <NavLink exact activeStyle={linkStyle} to='/'>anecdotes</NavLink>&nbsp;
          <NavLink activeStyle={linkStyle} to='/createnew'>create new</NavLink>&nbsp;
          <NavLink activeStyle={linkStyle} to='/about'>about</NavLink>&nbsp;
          </Nav>
  </Navbar.Collapse>
</Navbar>
        </div>
        <div style={hideWhen(message)}>
        <div style={notiStyle}>
        <p>{message}</p>
        </div>
        </div>
          <Route exact path="/" render={() => <AnecdoteList anecdotes={anecs} /> }/>
          <Route exact path="/createnew" render={({history}) => <CreateNew history={history} addNew={addnew}/> }/>
          <Route exact path="/about" render={() => <About />} />
          <Route exact path="/anecdotes/:id" render={({match}) => 
          <Single anecdote={anecdoteById(match.params.id)} />} />
      </div>
    </Router>
  </div>
)
const Notification = ({ message }) => (
  <div>
    <p> {message} </p>
  </div>
)
const tooltip = (
  <Tooltip id="tooltip">
  <strong>Click this link to open more info!</strong>
  </Tooltip>
)
const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped bordered condensed hover>
    <tbody>
      {anecdotes.map(anecdote => <tr key={anecdote.id} >
      <td>
        <OverlayTrigger placement="right" overlay={tooltip}>
      <NavLink to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</NavLink>
      </OverlayTrigger>
      </td>
      </tr>)}
    </tbody> 
    </Table> 
  </div>
)

const Single = ({anecdote}) => (
  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <p>has {anecdote.votes} votes</p>
    <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>

  </div>
)
const aboutStyle = {
paddingLeft:20
}
const italic = {
  fontStyle: 'italic'
}
const About = () => (
  <div >
    <h2>About anecdote app</h2>
    <div style={aboutStyle}>
    <p >According to Wikipedia:</p>
    <Grid>
      <Row>
        <Col xs={6} md={4}>
    <em style={italic}>An anecdote is a brief, revealing account of an individual person or an incident. 
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
      An anecdote is "a story with a point."</em>
      </Col>
      <Col xs={6} md={4}>
      <Carousel>
  <Carousel.Item>
    <img width={900} height={500} alt="900x500" src="https://www.thefamouspeople.com/profiles/images/bill-gates-1.jpg" />
    <Carousel.Caption>
      
      <p>Bill Gates</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img width={900} height={500} alt="900x500" src="https://specials-images.forbesimg.com/imageserve/9efa03c25417e97cae2969a1a4c60335/416x416.jpg?background=000000&cropX1=6&cropX2=663&cropY1=189&cropY2=846" />
    <Carousel.Caption>
      
      <p>Gaben Newell</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img width={900} height={500} alt="900x500" src="https://d3egew7zjohdb1.cloudfront.net/ponIltIpIv-1440511484/talouselama/bp2nhq-linus-torvalds.jpg/alternates/LANDSCAPE_640/linus%20torvalds.jpg" />
    <Carousel.Caption>
      <h3></h3>
      <p>Linus Torvalds</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
      
      </Col>
      </Row>
    </Grid>
    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </div>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)
const contentTip = (
  <Tooltip id="contentTip">
    <strong>type anecdote here</strong>
  </Tooltip>
);
const authorTip = (
  <Tooltip id="authorTip">
    <strong>this anecdote is by who?</strong>
  </Tooltip>
);
const urlTip = (
  <Tooltip id="urlTip">
    <strong>where to find more about this</strong>
  </Tooltip>
);
class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')

  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
          <FormGroup controlId="formValidationSuccess4" validationState="success">
            <ControlLabel>
            
            </ControlLabel>
            <InputGroup>
            <InputGroup.Addon>content</InputGroup.Addon>
            <OverlayTrigger placement="top" overlay={contentTip}>
            <FormControl
             type="text"
              name='content'
               value={this.state.content}
                onChange={this.handleChange} />
                </OverlayTrigger>
          </InputGroup>
          </FormGroup>{' '}
          <FormGroup controlId="formValidationSuccess4" validationState="success">
          <ControlLabel>
            author
            </ControlLabel>
            
            <InputGroup>
            <InputGroup.Addon>author</InputGroup.Addon>
            <OverlayTrigger placement="top" overlay={authorTip}>
            <FormControl
            type="text"
             name='author'
              value={this.state.author}
               onChange={this.handleChange} />
               </OverlayTrigger>
            </InputGroup>
            </FormGroup>{' '}
            <FormGroup controlId="formValidationSuccess4" validationState="success">
            <ControlLabel>
            
            </ControlLabel>
            <InputGroup>
            <InputGroup.Addon>url for more info</InputGroup.Addon>
            <OverlayTrigger placement="top" overlay={urlTip}>
            <FormControl type="text" name='info' value={this.state.info} onChange={this.handleChange} />
            </OverlayTrigger>
            </InputGroup>
            </FormGroup>{' '}
          </FormGroup> 
          <Button type="submit" bsStyle="success">create</Button>
        </form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
    this.setState({notification: `a new anecdote '${anecdote.content}' created!`  })
    
    setTimeout(() => {
      this.setState({
        notification: ''
      })
    }, 10000);
    console.log(this.state);
    
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }
 
  render() {
    return (
      <div className="container">
        <h1>Software anecdotes</h1>
          <Menu anecs={this.state.anecdotes} addnew={this.addNew} anecdoteById={this.anecdoteById} message={this.state.notification} />
         
        <Footer />
      </div>
    );
  }
}

export default App;
