


import db from '../models/index.js';
import bcrypt from 'bcrypt';
import AppError from '../error/app.error.js';
import { GetToken } from '../utils/security.js';



//check email is exist or not
export const IsEmailExist = async (email) => {
    return await db.user.findOne({ where: { email: email } });
};

export const CreateUser = async (userData) => {
    console.log("user data", userData)
    const existingUser = await IsEmailExist(userData.email);
    if (existingUser) throw new AppError(`Email: ${userData.email} is already taken.`);
    if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
    }
    return await db.user.create(userData);
};


// SaaS customer user login
export const CustUserLogin = async ({ email, password }) => {
    const existingUser = await db.user.findOne({ where: { email: email } });
    if (existingUser) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (isPasswordValid) {
            const claim = {
                email: existingUser.email,
                id: existingUser.id

            };
            const authToken = GetToken(claim)
            const userInfo = {
                authToken: authToken,
            };
            console.log("userInfo from user", userInfo)
            return { userInfo };
        } else {
            throw new AppError("Password is incorrect.");
        }
    } else {
        throw new AppError("Email is not registered.");
    }
};