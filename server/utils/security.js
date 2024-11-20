import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();


export const GetToken = (userDetails) => {
    const token = jwt.sign(userDetails, process.env.JWT_SECRET, { expiresIn: 360000 });
    // console.log("Generated token", token);
    return token
}

export const GetRefreshToken = (subject) => {
    const token = jwt.sign(subject, process.env.JWT_SECRET, {
        expiresIn: 3600
    });
    return token
}

export const VerifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded
    } catch (err) {
        console.log("verify Token error", err);
        throw err;
    }
}
