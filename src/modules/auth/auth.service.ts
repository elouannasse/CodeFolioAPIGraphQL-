import { User, IUser } from "./auth.model";
import {
  AuthenticationError,
  ConflictError,
  NotFoundError,
} from "@shared/errors";
import { JwtHelper } from "@shared/utils";

export class AuthService {
  async login(
    email: string,
    password: string
  ): Promise<{ token: string; user: IUser }> {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new AuthenticationError("Invalid email or password");
    }

    if (!user.isActive) {
      throw new AuthenticationError("Your account has been deactivated");
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new AuthenticationError("Invalid email or password");
    }

    const token = JwtHelper.generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    user.password = undefined as any;

    return { token, user };
  }

  async getUserById(userId: string): Promise<IUser | null> {
    return User.findById(userId);
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  async createUser(data: {
    username: string;
    email: string;
    password: string;
    role?: "admin" | "visitor";
  }): Promise<IUser> {
    const existingUser = await User.findOne({
      $or: [{ email: data.email }, { username: data.username }],
    });

    if (existingUser) {
      throw new ConflictError(
        "User with this email or username already exists"
      );
    }

    const user = await User.create(data);
    return user;
  }

  async updateUser(userId: string, data: Partial<IUser>): Promise<IUser> {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }

  async deleteUser(userId: string): Promise<boolean> {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return true;
  }
}

export const authService = new AuthService();
