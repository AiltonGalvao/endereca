import express from "express";
import AddressController from "../controllers/addressController.js"; // Problema da IDE
// import paginate from "../middlewares/pagination.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .get("/addresses", authMiddleware, AddressController.listAddresses)
  .get("/addresses/filtered_search", authMiddleware, AddressController.searchFilteredAddresses)
  .get("/addresses/search", authMiddleware, AddressController.searchAddresses)
  .get("/addresses/:id", authMiddleware, AddressController.listAddressById)
  .post("/addresses", authMiddleware, AddressController.createAddress)
  .put("/addresses/:id", authMiddleware, AddressController.updateAddress)
  .delete("/addresses/:id", authMiddleware, AddressController.deleteAddress);

export default router;