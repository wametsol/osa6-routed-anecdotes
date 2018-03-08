import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

const notiStyle = {
  color: 'green',
  fontStyle: 'italic',
  fontSize: 15,
  borderStyle: 'solid',
  borderWidth: 2,
  paddingLeft: 20,
  borderRadius: 20,
  lineHeight: 0


}

const menuStyle ={
  fontSize: 20,
  backgroundColor: 'lightgrey',
  paddingLeft: 100,
  lineHeight: 3
}
const linkStyle ={
  fontWeight: 'bold',
  color:'red',
  backgroundColor: 'lightblue',
  paddingTop: 10,
  paddingBottom: 10
}
const Menu = ({anecs, addnew, anecdoteById, message}) => (
  <div>  
    <Router>
      <div>
        <div style={menuStyle}>  
    <NavLink exact activeStyle={linkStyle} to='/'>anecdotes</NavLink>&nbsp;
    <NavLink activeStyle={linkStyle} to='/createnew'>create new</NavLink>&nbsp;
    <NavLink activeStyle={linkStyle} to='/about'>about</NavLink>&nbsp;
        </div>
        <div style={notiStyle}>
        <p>{message}</p>
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
const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} >
      <NavLink to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</NavLink>
      </li>)}
    </ul>  
  </div>
)

const Single = ({anecdote}) => (
  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <p>has {anecdote.votes} votes</p>
    <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>

  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>
    
    <em>An anecdote is a brief, revealing account of an individual person or an incident. 
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

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
          <div>
            content 
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </div> 
          <button>create</button>
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
      notification: 'Moi'
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
      <div>
        <h1>Software anecdotes</h1>
          <Menu anecs={this.state.anecdotes} addnew={this.addNew} anecdoteById={this.anecdoteById} message={this.state.notification} />
         
        <Footer />
      </div>
    );
  }
}

export default App;
