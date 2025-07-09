import AdminJS from "adminjs";
import express from "express";
import { Database, Resource, getModelByName } from "@adminjs/prisma";
import { PrismaClient } from "@prisma/client";
import { getRouterWithAuth } from "./auth.js";

const PORT = process.env.PORT || 3000;

const prisma = new PrismaClient();

AdminJS.registerAdapter({ Database, Resource });

const start = async () => {
  const admin = new AdminJS({
    resources: [
      {
        resource: { model: getModelByName("User"), client: prisma },
        options: {},
      },
      {
        resource: { model: getModelByName("Dish"), client: prisma },
        options: {},
      },
      {
        resource: { model: getModelByName("Order"), client: prisma },
        options: {},
      },
      {
        resource: { model: getModelByName("OrderItem"), client: prisma },
        options: {},
      },
    ],
  });

  const app = express();
  const router = getRouterWithAuth(admin);
  app.use(admin.options.rootPath, router);

  app.get("/", (req, res) => {
    res.redirect("/admin");
  });

  app.listen(PORT, () => {
    console.log(
      `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
    );
  });
};

start();
