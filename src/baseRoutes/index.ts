// base routes forEach methods

import { Application } from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { genreRoutes } from "../modules/genre/genre.route";
import { bookRoutes } from "../modules/book/book.route";
import { userLibraryRoutes } from "../modules/userLibrary/userLibrary.route";
import { userRoutes } from "../modules/user/user.route";

/* =========================
 Base Routes
 ========================= */
export const baseRoute = (app: Application, basePath: string) => {
  const routes = [
    { path: `${basePath}/auth`, route: authRoutes },
    { path: `${basePath}/genres`, route: genreRoutes },
      { path: `${basePath}/books`, route: bookRoutes },
      {
        path: `${basePath}/user-library`,
        route: userLibraryRoutes,   
      },
      {
          path: `${basePath}/users`,
          route: userRoutes,
      }
  ];

  routes.forEach((route) => {
    app.use(route.path, route.route);
  });
};
