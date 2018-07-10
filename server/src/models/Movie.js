import mongoose from "mongoose"
const Schema = mongoose.Schema

const movieSchema = new Schema({
  title: {type:String, required:true},
  year: {type:Number, required:true},
  actors: {type:Array, required:true},
  kind: {type: String, required:true},
  img: {type: String, required: true}
})

export default mongoose.model("Movie", movieSchema)
