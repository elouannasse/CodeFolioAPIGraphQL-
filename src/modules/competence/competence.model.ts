import mongoose, { Schema, Document } from "mongoose";

export interface ICompetence extends Document {
  _id: string;
  userId: mongoose.Types.ObjectId;
  name: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  icon?: string;
  yearsOfExperience?: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CompetenceSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Competence name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      enum: [
        "programming_language",
        "framework",
        "database",
        "tool",
        "soft_skill",
        "methodology",
        "cloud",
        "devops",
        "design",
        "other",
      ],
    },
    level: {
      type: String,
      required: [true, "Level is required"],
      enum: ["beginner", "intermediate", "advanced", "expert"],
      default: "intermediate",
    },
    icon: {
      type: String,
      trim: true,
    },
    yearsOfExperience: {
      type: Number,
      min: [0, "Years of experience cannot be negative"],
      max: [50, "Years of experience seems too high"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
  },
  {
    timestamps: true,
  }
);

CompetenceSchema.index({ userId: 1, category: 1 });

CompetenceSchema.index({ userId: 1, name: 1 }, { unique: true });

export const Competence = mongoose.model<ICompetence>(
  "Competence",
  CompetenceSchema
);
