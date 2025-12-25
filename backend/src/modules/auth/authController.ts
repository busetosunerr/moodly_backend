import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import {
  findUserByUsername,
  createUser,
  findUserByEmail,
  findUserById,
} from "../service/userService";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateTokens = (user: { username: string; id: string }) => {
  const jwtSecret = process.env.JWT_SECRET;
  const refreshSecret = process.env.REFRESH_SECRET;

  if (!jwtSecret || !refreshSecret) {
    throw new Error("JWT_SECRET or REFRESH_SECRET not defined");
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );
  const refreshToken = jwt.sign(
    { username: user.username, id: user.id },
    refreshSecret,
    { expiresIn: "1d" }
  );

  return { token, refreshToken };
};

export async function register(req: Request, res: Response) {
  try {
    const { username, password, email } = req.body;

    if (!username || !password) {
      console.error("Register error: Missing username or password");
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      console.error(`Register error: Username "${username}" already exists`);
      return res.status(409).json({ error: "Username already exists" });
    }
    const existingEmail = await findUserByEmail(email);
    if (existingEmail) {
      console.error(`Register error: Email "${email}" already exists`);
      return res.status(409).json({ error: "Email already exists" });
    }
    await createUser(username, password, email);
    const newUser = await findUserByUsername(username);

    if (!newUser) {
      console.error(
        "Register error: User could not be retrieved after creation"
      );
      return res.status(500).json({
        error: "Internal server error: Could not retrieve user after creation",
      });
    }

    const tokens = generateTokens(newUser);
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 1 * 60 * 60 * 24 * 1000,
    });

    return res.status(201).json({
      message: "User created successfully",
      accessToken: tokens.token,
    });
  } catch (err) {
    console.error("Register unexpected error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.error("Login error: Missing email or password");
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }

    const user = await findUserById(id);
    if (!user) {
      console.error(`Login error: User "${userid}" not found`);
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error(`Login error: Invalid password for user "${username}"`);
      return res.status(401).json({ message: "Invalid password" });
    }

    const tokens = generateTokens(user);
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 1 * 60 * 60 * 24 * 1000,
    });

    console.log(`user"${username}" logged in successfully`);
    return res.status(200).json({ message: "Login successful", ...tokens });
  } catch (err) {
    console.error("Login unexpected error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
