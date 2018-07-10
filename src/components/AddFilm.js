import React from "react"

const AddFilm = (props) => {
  return(
    <div>
      <form method="POST" action="http://localhost:5679/cine/add" encType="multipart/form-data">
        <input type="file" name="img"></input>
        <input type="text" name="title" placeholder="entrer un titre"></input>
        <input type="text" name="year" placeholder="entrer une année"></input>
        <input type="text" name="actors" placeholder="insérerles acteurs"></input>
        <input type="text" name="kind" placeholder="entrer un genre"></input>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  )
}

export default AddFilm
