import express from "express"
import Movie from '../models/Movie'
import multer from "multer"

//config multer
const storage = multer.diskStorage({
  destination: function( req, file, cb){
    cb(null, '../public')
  },
filename: function(req, file, cb){
  cb(null, file.filename + '-' + Date.now())
}
});

const upload = multer({storage: storage})


const cineRouter = express.Router()

cineRouter.post('/add', upload.single('img'), (req, res) => {
  const newMovie = new Movie(req.body)
  newMovie.img = req.file.filename
  newMovie.save((err, movie) => {
    if(err) return console.log(err)
    res.redirect("http://localhost:3000/")
  })
})

cineRouter.get('/', (req, res) => {
  Movie.find({}, (err, films) => {
    if(err) res.send(err)
    res.json(films)
  })
})

cineRouter.get('/:id', (req, res) => {//c'est un paramètre id: l'id qu'on rentre ici doit correspondre à celui qu'on find dans notre base de données
  Movie.find({_id: req.params.id}, (err, movie) => {
    if(err) res.send(err)
    res.json(movie)
  })
})

cineRouter.post('/:id', (req, res) => {//une sorte de put (car il marche pas avec un formulaire html)
  Movie.findOneAndUpdate({_id: req.params.id}, req.body, (err, movie) => {
    if(err) res.send(err)
    res.json(movie)
  })
})

cineRouter.delete('/:id', (req, res) => {
  Movie.delete({_id: req.params.id}, (err, movie) => {
    if(err) res.send(err)
    res.json({message: "y'a plus"})
  })
})

export default cineRouter
