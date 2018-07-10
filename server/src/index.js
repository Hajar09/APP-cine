import express from "express"
import mongoose from "mongoose"
import cors from "cors"//pb header
import volleyball from "volleyball"
 const port = process.env.PORT || 5679
import cineRouter from "./routes/cine"
//
const app = express()
//
//config mongoose
mongoose.connect('mongodb://localhost:27017/cine_db');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`[MongoDB] connected`);
});
//
app.use(volleyball)
app.use(cors())
app.use('/cine', cineRouter)



app.listen(port, () => {
  console.log(`[Express] running on port : ${port}`);
})
