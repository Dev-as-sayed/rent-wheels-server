import jwt from "jsonwebtoken";

export const createToken = (
  jwtPayloade: { email: string; role: string },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayloade, secret, { expiresIn });
};
