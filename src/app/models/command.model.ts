import Etat from "./etat.model";
import Marche from "./marche.model";
import Produit from "./produit.model";
import ProduitCommande from "./produitCommande.mode";
import User from "./user.model";

// Modèle pour la commande
export default interface Commande {
  id?: number;
  produits_commande: ProduitCommande[];
  etat: Etat;
  UserCommande: User[];
  produits: Produit[];
  marche: Marche;
  jour: string;
}
  