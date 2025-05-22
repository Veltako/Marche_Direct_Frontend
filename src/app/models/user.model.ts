// Model pour le User

import Categorie from "./categorie.model";
import Produit from "./produit.model";

// Ajout des champs
export default interface User { 
    id: string;
    email: string;
    userName: string;
    tel: string;
    nameBusiness: string;
    stats: [] ;
    imageFileName: string;
    descriptionCommerce: string;
    numSiret: string;
    userCategorie: Categorie[];
    produits: Produit[];
  }
