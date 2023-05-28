import mongoose from "mongoose";

const { MONGGO_URI } = process.env;

if (!MONGGO_URI) {
  throw new Error("Invalid environment");
}

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGGO_URI);

    if (connection.readyState === 1) {
      console.log("connected_db");
      return Promise.resolve(true);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
