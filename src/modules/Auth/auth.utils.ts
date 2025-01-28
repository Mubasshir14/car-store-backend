/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import jwt, { JwtPayload } from 'jsonwebtoken';

// type JwtPayloadCustom = {
//   email: string;
//   role: string;
//   [key: string]: string;
// };

// export const createToken = (
//   jwtPayload: JwtPayloadCustom,
//   secret: string,
//   expiresIn: string,
// ) => {
//   return jwt.sign(jwtPayload, secret, {
//     expiresIn,
//   });
// };

// export const verifyToken = (token: string, secret: string) => {
//   return jwt.verify(token, secret) as JwtPayload;
// };

import jwt, { JwtPayload } from 'jsonwebtoken';

type JwtPayloadCustom = {
  email: string;
  role: string;
};

export const createToken = (
  jwtPayload: JwtPayloadCustom,
  secret: string,
  expiresIn: string,
): string => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn: expiresIn as any,
  });
};

export const verifyToken = (token: string, secret: string): JwtPayload => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (err) {
    console.log(err);
    throw new Error('Invalid or expired token');
  }
};
