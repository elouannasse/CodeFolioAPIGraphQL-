import mongoose, { Schema, Document } from "mongoose";

export interface IProjet extends Document {
  _id: string;
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  category: string;
  featured: boolean;
  startDate?: Date;
  endDate?: Date;
  status: "completed" | "in_progress" | "planned";
  createdAt: Date;
  updatedAt: Date;
}

const ProjetSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
      maxlength: [3000, "Description cannot exceed 3000 characters"],
    },
    image: {
      type: String,
      trim: true,
    },
    technologies: {
      type: [String],
      default: [],
      validate: {
        validator: function (arr: string[]) {
          return arr.length > 0;
        },
        message: "At least one technology is required",
      },
    },
    demoUrl: {
      type: String,
      trim: true,
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      enum: ["web", "mobile", "desktop", "backend", "fullstack", "other"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["completed", "in_progress", "planned"],
      default: "completed",
    },
  },
  {
    timestamps: true,
  }
);

ProjetSchema.index({ userId: 1, featured: -1, createdAt: -1 });

export const Projet = mongoose.model<IProjet>("Projet", ProjetSchema);
