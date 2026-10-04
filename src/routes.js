// Description:
//   List http routes in hubot instance. (http listener may be disabled)
//
// Dependencies:
//   "express-list-endpoints": "^6.0.0"
//
// Configuration:
//   None
//
// Commands:
//   hubot http routes - List http routes in hubot instance
//
// Author:
//   stahnma
//
// Category: workflow

// Express 4 keeps routes on app._router; Express 5 (Hubot 11+) moved them to
// app.router. Reading app.router on Express 4 throws, so check _router first.
function routerFor(app) {
  if (app._router) {
    return app;
  }
  return app.router || app;
}

module.exports = function (robot) {
  const expressListEndpoints = require('express-list-endpoints');

  robot.respond(/\s*http routes\s*$/i, function (msg) {
    // List at request time so routes registered by scripts loaded later show up too.
    const endpoints = expressListEndpoints(routerFor(robot.router));

    // sort routes
    const sortedEndpoints = endpoints.sort((a, b) => {
      return a.path.localeCompare(b.path);
    });

    // Create a formatted message with HTTP verb and route
    const formattedRoutes = sortedEndpoints.map(endpoint => {
      // Make it pretty
      return `${endpoint.methods.join(', ').padEnd(10)} ${endpoint.path}`;
    });

    if(/slack/i.test(msg.robot.adapterName || '')) {
      msg.send("```" + "\n" + formattedRoutes.join('\n') + "```");
    } else {
      msg.send(formattedRoutes.join('\n'));
    }
  });
};
