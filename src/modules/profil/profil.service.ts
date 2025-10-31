import { Profil, IProfil } from "./profil.model";
import { NotFoundError, ConflictError } from "@shared/errors";

export class ProfilService {
  async getProfilByUserId(userId: string): Promise<IProfil | null> {
    return Profil.findOne({ userId });
  }

  async getProfilById(id: string): Promise<IProfil | null> {
    return Profil.findById(id);
  }

  async createProfil(userId: string, data: Partial<IProfil>): Promise<IProfil> {
    const existingProfil = await Profil.findOne({ userId });

    if (existingProfil) {
      throw new ConflictError("Profil already exists for this user");
    }

    const profil = await Profil.create({
      ...data,
      userId,
    });

    return profil;
  }

  async updateProfil(id: string, data: Partial<IProfil>): Promise<IProfil> {
    const profil = await Profil.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!profil) {
      throw new NotFoundError("Profil not found");
    }

    return profil;
  }

  async deleteProfil(id: string): Promise<boolean> {
    const profil = await Profil.findByIdAndDelete(id);

    if (!profil) {
      throw new NotFoundError("Profil not found");
    }

    return true;
  }
}

export const profilService = new ProfilService();
