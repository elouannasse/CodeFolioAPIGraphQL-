import mongoose, { Schema, Document } from "mongoose";

export interface IExperience extends Document {
  _id: string;
  userId: mongoose.Types.ObjectId;
  company: string;
  position: string;
  description: string;
  location?: string;
  employmentType:
    | "full-time"
    | "part-time"
    | "contract"
    | "freelance"
    | "internship";
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  technologies: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      maxlength: [150, "Company name cannot exceed 150 characters"],
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
      maxlength: [150, "Position cannot exceed 150 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    location: {
      type: String,
      trim: true,
    },
    employmentType: {
      type: String,
      required: [true, "Employment type is required"],
      enum: ["full-time", "part-time", "contract", "freelance", "internship"],
      default: "full-time",
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    technologies: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

ExperienceSchema.index({ userId: 1, startDate: -1 });

ExperienceSchema.pre("save", function (next) {
  if (!this.isCurrent && !this.endDate) {
    next(new Error("End date is required when position is not current"));
  }
  next();
});

export const Experience = mongoose.model<IExperience>(
  "Experience",
  ExperienceSchema
);
