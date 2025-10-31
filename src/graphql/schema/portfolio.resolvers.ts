import { profilService } from "@modules/profil/profil.service";
import { projetService } from "@modules/projet/projet.service";
import { experienceService } from "@modules/experience/experience.service";
import { competenceService } from "@modules/competence/competence.service";
import { educationService } from "@modules/auth/education.service";

export const portfolioResolvers = {
  Query: {
    getPortfolio: async (_: any, { userId }: any, context: any) => {
      const targetUserId = userId || context.user?.userId;

      if (!targetUserId) {
        return {
          profil: null,
          projets: [],
          experiences: [],
          competences: [],
          educations: [],
        };
      }

      const [profil, projets, experiences, competences, educations] =
        await Promise.all([
          profilService.getProfilByUserId(targetUserId),
          projetService.getProjets({ userId: targetUserId }),
          experienceService.getExperiences(targetUserId),
          competenceService.getCompetences({ userId: targetUserId }),
          educationService.getEducations(targetUserId),
        ]);

      return {
        profil,
        projets,
        experiences,
        competences,
        educations,
      };
    },
  },
};
