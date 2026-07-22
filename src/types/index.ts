//src/types/index.ts

export interface GeneralConfig {
  nom: string;
  slogan: string;
  logo: string;
  email: string;
  telephone: string;
  adresse: string;
  presentationTitre: string;
  presentationTexte: string;
  descriptionLongue: string;
  lienBandeau: string;
}

export interface NewsItem {
  id: string;
  afficherSurAccueil: string;
  date: string;
  titre: string;
  description: string;
  image: string;
  lien: string;
}

export interface EventItemType {
  id: string;
  date: string;
  title: string;
  location: string;
  lieuPrecise: string;
  description: string;
  estPublic: string;
  tarif: string;
  logoEvenement: string;
  lienInfo: string;
  lienResa: string;
  lienPlan: string;
  statut: 'Confirmé' | 'Projet' | 'Annulé';
}

export interface MemberItem {
  id: string;
  nom: string;
  role: string;
  description: string;
  photoUrl: string;
}

export interface MediaItem {
  id: string;
  titre: string;
  type: 'Image' | 'Video' | 'Audio';
  url: string;
  miniature: string;
}

export interface UsefulLink {
  id: string;
  lienTitre: string;
  lienDescription: string;
  lienUrl: string;
  lienCategorie: string;
  lienLogoUrl: string;
}
