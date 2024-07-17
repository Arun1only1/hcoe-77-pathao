import mongoose from "mongoose";

// set schema/structure
const vehicleSchema = new mongoose.Schema({
  brand: String,
  model: String,
  builtYear: Number,
  type: String,
});

// create model/table
const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;
