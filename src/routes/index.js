const fs = require("fs");
const path = require("path");

const artBidInteractionRoutes = require("./artBidInteractionRoutes");

const artConnectDirectoryRoutes = require("./artConnectDirectoryRoutes");
const artMarketRoutes = require("./artMarketRoutes");
const notificationRoutes = require("./notificationRoutes");
const projectParticipationRoutes = require("./projectParticipationRoutes");
const artWorkRoutes = require("./artWorkRoutes");

const userRoutes = require("./userRoutes");
const artLearnRoutes = require("./artLearnRoutes");
const generalUserRoutes = require("./generalUserRoutes");
const loadAppRoutes = (app) => {
  const loadRoutes = (baseRoute, routesPath) => {
    // Read files and sort them alphabetically
    const files = fs.readdirSync(routesPath).sort();
    files.forEach((file) => {
      if (file.endsWith(".js")) {
        const routePath = path.join(routesPath, file);
        const route = require(routePath);
        const routeName = file.replace(".js", "");
        // console.log(`/${baseRoute}/${routeName}`)
        app.use(`/${baseRoute}/${routeName}`, route);
      }
    });
  };
  // auth routes
  loadRoutes("v1", artBidInteractionRoutes);
  loadRoutes("v1", userRoutes);
  loadRoutes("v1", artWorkRoutes);
  loadRoutes("v1", artConnectDirectoryRoutes);
  loadRoutes("v1", artMarketRoutes);
  loadRoutes("v1", notificationRoutes);
  loadRoutes("v1", artLearnRoutes);
  loadRoutes("v1", projectParticipationRoutes);
  loadRoutes("v1",generalUserRoutes)

};

module.exports = {
  loadAppRoutes,
};
