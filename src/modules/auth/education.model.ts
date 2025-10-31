import mongoose, { Schema, Document } from "mongoose";

export interface IEducation extends Document {
  _id: string;
  userId: mongoose.Types.ObjectId;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  grade?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EducationSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    institution: {
      type: String,
      required: [true, "Institution name is required"],
      trim: true,
      maxlength: [200, "Institution name cannot exceed 200 characters"],
    },
    degree: {
      type: String,
      required: [true, "Degree is required"],
      trim: true,
      maxlength: [150, "Degree cannot exceed 150 characters"],
    },
    fieldOfStudy: {
      type: String,
      required: [true, "Field of study is required"],
      trim: true,
      maxlength: [150, "Field of study cannot exceed 150 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
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
    grade: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

EducationSchema.index({ userId: 1, startDate: -1 });

EducationSchema.pre("save", function (next) {
  if (!this.isCurrent && !this.endDate) {
    next(new Error("End date is required when education is not current"));
  }
  next();
});

export const Education = mongoose.model<IEducation>(
  "Education",
  EducationSchema
);
