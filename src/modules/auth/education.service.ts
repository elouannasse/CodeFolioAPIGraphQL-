import { Education, IEducation } from "./education.model";
import { NotFoundError } from "@shared/errors";

export class EducationService {
  async getEducations(userId?: string): Promise<IEducation[]> {
    const query: any = {};

    if (userId) {
      query.userId = userId;
    }

    return Education.find(query).sort({ startDate: -1 });
  }

  async getEducationById(id: string): Promise<IEducation | null> {
    return Education.findById(id);
  }

  async createEducation(
    userId: string,
    data: Partial<IEducation>
  ): Promise<IEducation> {
    const education = await Education.create({
      ...data,
      userId,
    });

    return education;
  }

  async updateEducation(
    id: string,
    data: Partial<IEducation>
  ): Promise<IEducation> {
    const education = await Education.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!education) {
      throw new NotFoundError("Education not found");
    }

    return education;
  }

  async deleteEducation(id: string): Promise<boolean> {
    const education = await Education.findByIdAndDelete(id);

    if (!education) {
      throw new NotFoundError("Education not found");
    }

    return true;
  }
}

export const educationService = new EducationService();
