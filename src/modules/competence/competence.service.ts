import { Competence, ICompetence } from "./competence.model";
import { NotFoundError } from "@shared/errors";

export class CompetenceService {
  async getCompetences(
    filters: { userId?: string; category?: string } = {}
  ): Promise<ICompetence[]> {
    const query: any = {};

    if (filters.userId) {
      query.userId = filters.userId;
    }

    if (filters.category) {
      query.category = filters.category;
    }

    return Competence.find(query).sort({ category: 1, name: 1 });
  }

  async getCompetenceById(id: string): Promise<ICompetence | null> {
    return Competence.findById(id);
  }

  async createCompetence(
    userId: string,
    data: Partial<ICompetence>
  ): Promise<ICompetence> {
    const competence = await Competence.create({
      ...data,
      userId,
    });

    return competence;
  }

  async updateCompetence(
    id: string,
    data: Partial<ICompetence>
  ): Promise<ICompetence> {
    const competence = await Competence.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!competence) {
      throw new NotFoundError("Competence not found");
    }

    return competence;
  }

  async deleteCompetence(id: string): Promise<boolean> {
    const competence = await Competence.findByIdAndDelete(id);

    if (!competence) {
      throw new NotFoundError("Competence not found");
    }

    return true;
  }
}

export const competenceService = new CompetenceService();
