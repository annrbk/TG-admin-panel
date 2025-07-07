import { DefaultAuthProvider } from "adminjs";
import { buildAuthenticatedRouter } from "@adminjs/express";

const authenticate = ({ email, password }, ctx) => {
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return { email };
  } else {
    return null;
  }
};

const authProvider = new DefaultAuthProvider({
  authenticate,
});

export const getRouterWithAuth = (admin) => {
  return buildAuthenticatedRouter(
    admin,
    {
      cookiePassword: process.env.COOKIE_PASSWORD,
      provider: authProvider,
    },
    null,
    {
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: true,
    }
  );
};
