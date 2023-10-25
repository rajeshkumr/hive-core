import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.serializeUser((user, done) => done(undefined, user));
passport.deserializeUser((_user, done) => done(undefined, false));

export const googleAuth = () => {
  return new Promise((resolve) => {
    passport.use(new GoogleStrategy({
      clientID: Bun.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret:  Bun.env.GOOGLE_CLIENT_SECRET ?? "",
      callbackURL: "localhost:3000"
    },(accessToken, refreshToken, profile, cb) => {
      cb(null, profile);
      resolve({
        accessToken,
        refreshToken,
        profile,
        cb
      })
    }
  ));
  })
}

export const facebookAuth = () => {
  return new Promise((resolve) => {
    passport.use(new FacebookStrategy({
      clientID: Bun.env.FACEBOOK_CLIENT_ID ?? "",
      clientSecret:  Bun.env.FACEBOOK_CLIENT_SECRET ?? "",
      callbackURL: "localhost:3000"
    },(accessToken, refreshToken, profile, cb) => {
      cb(null, profile);
      resolve({
        accessToken,
        refreshToken,
        profile,
        cb
      })
    }
  ));
  })
}

export default passport