import NotFound from "../errors/NotFound.js";
import { addresses } from "../models/index.js";
import checkForNearbyWaypoints from "../utils/checkForNearbyWaypoints.js";

class AddressController {

  static listAddresses = async (req, res, next) => {
    try {
      const addressesResult = addresses.find();

      req.result = addressesResult;

      next();
    } catch (error) {
      next(error);
    }
  };

  static listAddressById = async (req, res, next) => {
    try {
      const id = req.params.id;

      let addressResult = await addresses.findById(id)
        .lean() // Isso aqui converte o objeto do Mongoose (imutável) para um do javascript (mutável).
        .populate("createdBy")
        .exec();

      if (addressResult !== null) {

        addressResult.nearbyWaypoints = await checkForNearbyWaypoints(addressResult, 10);

        res.status(200).send(addressResult);
      } else {
        next(new NotFound("Id do Endereço não localizado"));
      }
    } catch (error) {
      next(error);
    }
  };

  static createAddress = async (req, res, next) => {
    try {
      let address = new addresses(req.body);

      const addressResult = await address.save();

      res.status(201).send(addressResult.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static updateAddress = async (req, res, next) => {
    try {
      const id = req.params.id;

      const addressResult = await addresses.findByIdAndUpdate(id, {$set: req.body});

      if (addressResult !== null) {
        res.status(200).send({message: "Endereço atualizado com sucesso"});      
      } else {
        next(new NotFound("Id do Usuário não localizado"));
      }
    } catch (error) {
      next(error);
    }
  };

  static deleteAddress = async (req, res, next) => {
    try {
      const id = req.params.id;

      const addressResult = addresses.findByIdAndDelete(id);

      if (addressResult !== null) {
        res.status(200).send({message: "Endereço removido com sucesso"});      
      } else {
        next(new NotFound("Id do Endereço não localizado"));
      }
    } catch (error) {
      next(error);
    }
  };

}

export default AddressController;