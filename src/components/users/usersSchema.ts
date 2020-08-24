import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { NextFunction } from "express";

export interface User {
    displayName: string,
    email: string,
    password: string
}

const UsersSchema = new mongoose.Schema({
    displayName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});


export default mongoose.model("User", UsersSchema);
