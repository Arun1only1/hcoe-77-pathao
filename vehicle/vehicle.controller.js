import express from "express";
import Vehicle from "./vehicle.model.js";
import mongoose from "mongoose";

const router = express.Router();

// * add vehicle
router.post("/vehicle/add", async (req, res) => {
  //   extract new vehicle from req.body
  const newVehicle = req.body;

  // add vehicle
  await Vehicle.create(newVehicle);

  // send res
  return res.status(201).send({ message: "Vehicle is added successfully." });
});

// * get vehicle list
router.get("/vehicle/list", async (req, res) => {
  const vehicles = await Vehicle.find();

  return res.status(200).send({ message: "success", vehicleList: vehicles });
});

// * delete vehicle by id
router.delete("/vehicle/delete/:id", async (req, res) => {
  // extract vehicle id from req.params
  const vehicleId = req.params.id;

  // check for mongo id validity
  const isValidId = mongoose.isValidObjectId(vehicleId);

  // if not valid mongo id, throw error
  if (!isValidId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  // find vehicle using vehicle id
  const vehicle = await Vehicle.findOne({ _id: vehicleId });

  // if not vehicle found, throw error
  if (!vehicle) {
    return res.status(404).send({ message: "Vehicle does not exist." });
  }

  // delete vehicle
  await Vehicle.deleteOne({ _id: vehicleId });

  // send res
  return res.status(200).send({ message: "Vehicle is deleted successfully." });
});

// *edit product by id
router.put("/vehicle/edit/:id", async (req, res) => {
  // extract vehicle id from req.params
  const vehicleId = req.params.id;

  // check for mongo id validity
  const isValidId = mongoose.isValidObjectId(vehicleId);

  // if not valid id, throw error
  if (!isValidId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  // find vehicle using vehicle id
  const requiredVehicle = await Vehicle.findOne({ _id: vehicleId });

  // if vehicle not found, throw error
  if (!requiredVehicle) {
    return res.status(404).send({ message: "Vehicle does not exist." });
  }

  // extract new values from req.body
  const newValues = req.body;

  // edit vehicle
  await Vehicle.updateOne(
    { _id: vehicleId },
    {
      $set: {
        ...newValues,
      },
    }
  );
  // send res
  return res.status(200).send({ message: "Vehicle is updated successfully." });
});

export default router;
