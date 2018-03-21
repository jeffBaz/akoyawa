export interface Panier {
	prestation:Prestation[];
}


export interface Prestation {
	prestataire?:Prestataire;
  idPrestation:string;
	datePrestation?:Date;
	titre:string;
	desc:string;
	prix:number;
	duree?:number;	
  url?:string
}


export interface Prestataire {
	idPrestataire:string;
	nom:string;
	prenom:string;
	
}