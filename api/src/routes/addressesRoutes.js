import express from "express";
import AddressController from "../controllers/AddressController.js";

const router = express.Router();

router
  .get("/addresses", AddressController.listAddresses)
  .get("/addresses/:id", AddressController.listAddressById)
  .post("/addresses", AddressController.createAddress)
  .put("/addresses/:id", AddressController.updateAddress)
  .delete("/addresses/:id", AddressController.deleteAddress);

export default router;