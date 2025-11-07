export interface LoginInput {
  email: string;
  password: string;
}

export interface CreateProfilInput {
  nom: string;
  prenom: string;
  titre?: string;
  bio?: string;
  email?: string;
  telephone?: string;
  adresse?: string;
  ville?: string;
  codePostal?: string;
  pays?: string;
  avatar?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface UpdateProfilInput {
  nom?: string;
  prenom?: string;
  titre?: string;
  bio?: string;
  email?: string;
  telephone?: string;
  adresse?: string;
  ville?: string;
  codePostal?: string;
  pays?: string;
  avatar?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface CreateProjetInput {
  titre: string;
  description?: string;
  technologies?: string[];
  dateDebut?: string;
  dateFin?: string;
  lienGithub?: string;
  lienDemo?: string;
  image?: string;
  statut?: "EN_COURS" | "TERMINE" | "ARCHIVE";
}

export interface UpdateProjetInput {
  titre?: string;
  description?: string;
  technologies?: string[];
  dateDebut?: string;
  dateFin?: string;
  lienGithub?: string;
  lienDemo?: string;
  image?: string;
  statut?: "EN_COURS" | "TERMINE" | "ARCHIVE";
}

export interface CreateExperienceInput {
  titre: string;
  entreprise: string;
  lieu?: string;
  dateDebut?: string;
  dateFin?: string;
  description?: string;
  competences?: string[];
  typeEmploi?: "CDI" | "CDD" | "FREELANCE" | "STAGE" | "ALTERNANCE";
  estActuel?: boolean;
}

export interface UpdateExperienceInput {
  titre?: string;
  entreprise?: string;
  lieu?: string;
  dateDebut?: string;
  dateFin?: string;
  description?: string;
  competences?: string[];
  typeEmploi?: "CDI" | "CDD" | "FREELANCE" | "STAGE" | "ALTERNANCE";
  estActuel?: boolean;
}

export interface CreateCompetenceInput {
  nom: string;
  categorie?: string;
  niveau?: "DEBUTANT" | "INTERMEDIAIRE" | "AVANCE" | "EXPERT";
  description?: string;
  icone?: string;
}

export interface UpdateCompetenceInput {
  nom?: string;
  categorie?: string;
  niveau?: "DEBUTANT" | "INTERMEDIAIRE" | "AVANCE" | "EXPERT";
  description?: string;
  icone?: string;
}
