import { DefaultAuthProvider } from "adminjs";
import { buildAuthenticatedRouter } from "@adminjs/express";
import session from "express-session";
import memorystore from "memorystore";

const MemoryStore = memorystore(session);

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
    session({
      cookie: { maxAge: 86400000 },
      store: new MemoryStore({
        checkPeriod: 86400000,
      }),
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );
};
