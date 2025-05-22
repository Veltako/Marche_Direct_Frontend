import Jours from "./jours.models";
import User from "./user.model";

export default interface Marche 
{
    id: number;
    marcheName: string;
    place: string;
    hourly: string;
    imageFileName: string;
    description: Text;
    days: Jours [];
    commercant_marche: User[];
}