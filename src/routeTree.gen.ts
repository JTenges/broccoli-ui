/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as PublicLayoutRouteImport } from "./routes/_publicLayout/route";
import { Route as PublicLayoutIndexImport } from "./routes/_publicLayout/index";

// Create/Update Routes

const PublicLayoutRouteRoute = PublicLayoutRouteImport.update({
  id: "/_publicLayout",
  getParentRoute: () => rootRoute,
} as any);

const PublicLayoutIndexRoute = PublicLayoutIndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => PublicLayoutRouteRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/_publicLayout": {
      id: "/_publicLayout";
      path: "";
      fullPath: "";
      preLoaderRoute: typeof PublicLayoutRouteImport;
      parentRoute: typeof rootRoute;
    };
    "/_publicLayout/": {
      id: "/_publicLayout/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof PublicLayoutIndexImport;
      parentRoute: typeof PublicLayoutRouteImport;
    };
  }
}

// Create and export the route tree

interface PublicLayoutRouteRouteChildren {
  PublicLayoutIndexRoute: typeof PublicLayoutIndexRoute;
}

const PublicLayoutRouteRouteChildren: PublicLayoutRouteRouteChildren = {
  PublicLayoutIndexRoute: PublicLayoutIndexRoute,
};

const PublicLayoutRouteRouteWithChildren =
  PublicLayoutRouteRoute._addFileChildren(PublicLayoutRouteRouteChildren);

export interface FileRoutesByFullPath {
  "": typeof PublicLayoutRouteRouteWithChildren;
  "/": typeof PublicLayoutIndexRoute;
}

export interface FileRoutesByTo {
  "/": typeof PublicLayoutIndexRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/_publicLayout": typeof PublicLayoutRouteRouteWithChildren;
  "/_publicLayout/": typeof PublicLayoutIndexRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths: "" | "/";
  fileRoutesByTo: FileRoutesByTo;
  to: "/";
  id: "__root__" | "/_publicLayout" | "/_publicLayout/";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  PublicLayoutRouteRoute: typeof PublicLayoutRouteRouteWithChildren;
}

const rootRouteChildren: RootRouteChildren = {
  PublicLayoutRouteRoute: PublicLayoutRouteRouteWithChildren,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_publicLayout"
      ]
    },
    "/_publicLayout": {
      "filePath": "_publicLayout/route.tsx",
      "children": [
        "/_publicLayout/"
      ]
    },
    "/_publicLayout/": {
      "filePath": "_publicLayout/index.tsx",
      "parent": "/_publicLayout"
    }
  }
}
ROUTE_MANIFEST_END */
