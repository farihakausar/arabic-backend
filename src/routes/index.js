const fs = require("fs")
const path = require("path")

const authRoutes = require("./authRoutes")



const loadAppRoutes = (app) => {
  const loadRoutes = (baseRoute, routesPath) => {
    // Read files and sort them alphabetically
    const files = fs.readdirSync(routesPath).sort()
    files.forEach((file) => {
      if (file.endsWith(".js")) {
        const routePath = path.join(routesPath, file)
        const route = require(routePath)
        const routeName = file.replace(".js", "")
        // console.log(`/${baseRoute}/${routeName}`)
        app.use(`/${baseRoute}/${routeName}`, route)
      }
    })
  }
  // auth routes
  loadRoutes("v1", authRoutes)
 

}

module.exports = {
  loadAppRoutes,
}

