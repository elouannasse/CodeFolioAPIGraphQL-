import { Experience, IExperience } from "./experience.model";
import { NotFoundError } from "@shared/errors";
import { transformEnumsForMongoose } from "@shared/utils/enum-mapper";

export class ExperienceService {
  async getExperiences(userId?: string): Promise<IExperience[]> {
    const query: any = {};

    if (userId) {
      query.userId = userId;
    }

    return Experience.find(query).sort({ startDate: -1 });
  }

  async getExperienceById(id: string): Promise<IExperience | null> {
    return Experience.findById(id);
  }

  async createExperience(
    userId: string,
    data: Partial<IExperience>
  ): Promise<IExperience> {
    const mappedData = transformEnumsForMongoose(data, ["employmentType"]);

    const experience = await Experience.create({
      ...mappedData,
      userId,
    });

    return experience;
  }

  async updateExperience(
    id: string,
    data: Partial<IExperience>
  ): Promise<IExperience> {
    const mappedData = transformEnumsForMongoose(data, ["employmentType"]);

    const experience = await Experience.findByIdAndUpdate(
      id,
      { $set: mappedData },
      { new: true, runValidators: true }
    );

    if (!experience) {
      throw new NotFoundError("Experience not found");
    }

    return experience;
  }

  async deleteExperience(id: string): Promise<boolean> {
    const experience = await Experience.findByIdAndDelete(id);

    if (!experience) {
      throw new NotFoundError("Experience not found");
    }

    return true;
  }
}

export const experienceService = new ExperienceService();
