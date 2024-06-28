import express from "express";
import AddressController from "../controllers/AddressController.js";
import paginate from "../middlewares/pagination.js";

const router = express.Router();

router
  .get("/addresses", AddressController.listAddresses, paginate)
  .get("/addresses/:id", AddressController.listAddressById)
  .post("/addresses", AddressController.createAddress)
  .put("/addresses/:id", AddressController.updateAddress)
  .delete("/addresses/:id", AddressController.deleteAddress);

export default router;