import passport from "passport";

export const facebookLogin = () => {
  passport.authenticate("facebook", {
    scope: ["public_profile", "email"],
    failureRedirect: '/login'
  }, (_request: any, response: any) => {
    response.status(200).send();
  })
}

export const googleLogin = () => {
  passport.authenticate("google", {
    failureRedirect: '/login'
  }, (_request: any, response: any) => {
    response.status(200).send();
  })
}