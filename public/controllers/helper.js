import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const correctPass = async (Candidiatepass, userPass) => {
    return await bcrypt.compare(Candidiatepass, userPass);
};
const { JWT_SECRET } = process.env;
// const JWT_SECRET: Secret = process.env.JWT_SECRET || "default_secret";
const JWTEXPIN = 86400;
const JWT_ISS = process.env.JWT_ISS || "MT";
export const payload = (user) => {
    const signOptions = {
        expiresIn: JWTEXPIN,
        issuer: JWT_ISS,
    };
    const token = jwt.sign({ Id: user._id, email: user.email }, JWT_SECRET, signOptions);
    return { user, token };
};
