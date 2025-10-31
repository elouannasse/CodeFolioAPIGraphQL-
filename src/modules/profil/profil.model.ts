import mongoose, { Schema, Document } from "mongoose";

export interface ISocial {
  platform: string;
  url: string;
  icon?: string;
}

export interface IProfil extends Document {
  _id: string;
  userId: mongoose.Types.ObjectId;
  fullName: string;
  title: string;
  bio: string;
  avatar?: string;
  email: string;
  phone?: string;
  location?: string;
  socials: ISocial[];
  resume?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SocialSchema: Schema = new Schema(
  {
    platform: {
      type: String,
      required: true,
      enum: [
        "github",
        "linkedin",
        "twitter",
        "facebook",
        "instagram",
        "youtube",
        "website",
        "other",
      ],
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const ProfilSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: [100, "Full name cannot exceed 100 characters"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [150, "Title cannot exceed 150 characters"],
    },
    bio: {
      type: String,
      required: [true, "Bio is required"],
      trim: true,
      maxlength: [2000, "Bio cannot exceed 2000 characters"],
    },
    avatar: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    phone: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    socials: {
      type: [SocialSchema],
      default: [],
    },
    resume: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Profil = mongoose.model<IProfil>("Profil", ProfilSchema);
