import jwt, { JwtPayload } from "jsonwebtoken";

export const generateTokens = (user: JwtPayload) => {
  // logic to generate tokens

  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};
