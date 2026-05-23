import Cookies from "js-cookie";
import { MOCK_USERS } from "./mockDatabase";

export const simulateLoginApi = (
  email: string,
  password: string,
  userOtp: string,
): Promise<{ accessToken: string; user: any }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const accountMatch = MOCK_USERS.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password,
      );

      if (!accountMatch) {
        return reject(new Error("Invalid email or password credentials."));
      }

      if (accountMatch.expectedOtp !== userOtp) {
        return reject(
          new Error("The security code you entered is invalid or has expired."),
        );
      }

      const accessToken = `mock-access-token-expires-15m-${Date.now()}`;
      const refreshToken = `mock-refresh-token-expires-7d-${Date.now()}`;

      Cookies.set("firmly_refresh_token", refreshToken, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });

      resolve({ accessToken, user: accountMatch.user });
    }, 800);
  });
};

export const simulateRefreshApi = (): Promise<{ accessToken: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const refreshToken = Cookies.get("firmly_refresh_token");

      if (refreshToken) {
        const newAccessToken = `mock-access-token-expires-15m-${Date.now()}`;
        resolve({ accessToken: newAccessToken });
      } else {
        reject(new Error("Session expired. Please log back in."));
      }
    }, 400);
  });
};
