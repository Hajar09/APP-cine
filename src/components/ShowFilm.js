import React, { Component } from "react"

class ShowFilm  extends Component {
  constructor(props){
    super(props)//paramètre pour accéder à un contenu privé
    this.state = {
      movie: []
    }
  }
  componentDidMount() {
    fetch('http://localhost:5679/cine')//connexion grace au fetch à cette url
    .then(res => res.json())//tu veux recup le json puis on veut faire une action
    .then(body => {//body est un objet qui va remplir le tableau movie; tout ce qu'il fetch est dans body
      this.setState({
        movie: body
      })
    })
    .catch(err => {throw err})
  }
  render() {
    return(
      <div>
        {this.state.movie.map(movie => {//src={`${movie.img}`} --> pour avoir le lien de la source proprement
          return <ul>
            <li>Title: {movie.title}</li>
            <li>Année: {movie.year}</li>
            <li>Acteurs: {movie.actors}</li>
            <li>Genre: {movie.kind}</li>
            <img  alt="" src={`${movie.img}`}/>
          </ul>
        })}
      </div>
    )
  }
}

export default ShowFilm
