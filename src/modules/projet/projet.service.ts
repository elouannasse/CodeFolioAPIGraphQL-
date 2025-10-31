import { Projet, IProjet } from "./projet.model";
import { NotFoundError } from "@shared/errors";
import { transformEnumsForMongoose } from "@shared/utils/enum-mapper";

export class ProjetService {
  async getProjets(
    filters: { userId?: string; featured?: boolean } = {}
  ): Promise<IProjet[]> {
    const query: any = {};

    if (filters.userId) {
      query.userId = filters.userId;
    }

    if (filters.featured !== undefined) {
      query.featured = filters.featured;
    }

    return Projet.find(query).sort({ createdAt: -1 });
  }

  async getProjetById(id: string): Promise<IProjet | null> {
    return Projet.findById(id);
  }

  async createProjet(userId: string, data: Partial<IProjet>): Promise<IProjet> {
    const mappedData = transformEnumsForMongoose(data, ["status"]);

    const projet = await Projet.create({
      ...mappedData,
      userId,
    });

    return projet;
  }

  async updateProjet(id: string, data: Partial<IProjet>): Promise<IProjet> {
    const mappedData = transformEnumsForMongoose(data, ["status"]);

    const projet = await Projet.findByIdAndUpdate(
      id,
      { $set: mappedData },
      { new: true, runValidators: true }
    );

    if (!projet) {
      throw new NotFoundError("Projet not found");
    }

    return projet;
  }

  async deleteProjet(id: string): Promise<boolean> {
    const projet = await Projet.findByIdAndDelete(id);

    if (!projet) {
      throw new NotFoundError("Projet not found");
    }

    return true;
  }
}

export const projetService = new ProjetService();
