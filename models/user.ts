import { model, Schema, models, Types } from "mongoose";

export interface IUser {
  _id: string;
  email: string;
  fullname: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "invalid email address",
    ],
  },
  fullname: {
    type: String,
    required: [true, "Fullname is required"],
    minlength: [4, "Fullname should be minimal 4 character"],
    maxlength: [30, "Fullname should be maximal 30 character"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
});

const User = models.User || model<IUser>("User", userSchema);

export default User;
