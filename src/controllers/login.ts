import { google, facebook } from "@lucia-auth/oauth/providers";
import auth from "../helpers/lucia";

export const googleAuth = google(auth, {
	clientId: process.env.GOOGLE_CLIENT_ID || "NOT_DEFINED", // env var
	clientSecret: process.env.GOOGLE_CLIENT_SECRET || "NOT_DEFINED",
  redirectUri: process.env.GOOGLE_CALLBACK || "NOT_DEFINED"
});

export const facebookAuth = facebook(auth, {
	clientId: process.env.FACEBOOK_CLIENT_ID || "NOT_DEFINED", // env var
	clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "NOT_DEFINED",
  redirectUri: process.env.FACEBOOK_CALLBACK || "NOT_DEFINED"
});