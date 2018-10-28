'use strict';

const express = require(`express`);

const corsRoute = require(`./cors`);
const logRoute = require(`./route-request-log`);
const defaultRoute = require(`./route-default`);
const avatarRoute = require(`./route-avatar`);
const errorRoute = require(`./route-error`);

const offersRouter = new express.Router();

corsRoute(offersRouter);
logRoute(offersRouter);
defaultRoute(offersRouter);
avatarRoute(offersRouter);
errorRoute(offersRouter);

module.exports = (store, imagestore) => {
  offersRouter.offerStore = store;
  offersRouter.imageStore = imagestore;
  return offersRouter;
};
