import mongoose from "mongoose";
import checkIfValidGeoCoords from "../../../utils/checkIfValidGeoCoords.js";

const addressSchema = new mongoose.Schema(
  {
    id: {
      type: String
    },
    name: {
      type: String,
      required: true
    },
    locationType : { // Tipo
      type: String,
      enum: [
        "Domicílio Particular",
        "Domicílio Coletivo",
        "Estabelecimento Agropecuário",
        "Estabelecimento de Ensino",
        "Estabelecimento de Saúde",
        "Estabelecimento Religioso",
        "Estabelecimento Outros",
        "Edificação em Construção"
      ],
      required: [true, "O tipo do endereço é obrigatório"]
    },
    createdAt: { // Data do Cadastro, pensando se seria melhor usar unix timestamps...
      type: Date,
      required: true
    },
    // nearbyPoints: { // Pontos de Interesse Próximos // Isso vai ser calculado na hora
    //   type: [String],
    // },
    createdBy: { // Cadastrador
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    project: { // Projeto
      type: String,
      required: true
    },
    observations: {
      type: String
    },
    plusCode: { // Plus Code associado ao Endereço, pensando se precisa guardar isso, pois isso pode ser calculado a partir das coordenadas
      type: String,
      required: true
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true
      },
      coordinates: {
        type: [Number], // GeoJSON -> longitude, latitude
        required: true,
        validate: {
          validator: (value) => {
            return checkIfValidGeoCoords(value);
          },
          message: "O valor inserido {VALUE} não é um par de coordenadas válidas"
        }
      }
    }
  },
  {
    versionKey: false
  }
);

const addresses = mongoose.model("addresses", addressSchema);

export default addresses;