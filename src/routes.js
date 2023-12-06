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

module.exports = function (robot) {
  const expressListEndpoints = require('express-list-endpoints');
  const endpoints = expressListEndpoints(robot.router);

  robot.respond(/\s*http routes\s*$/i, function (msg) {

    // sort routes
    const sortedEndpoints = endpoints.sort((a, b) => {
      return a.path.localeCompare(b.path);
    });

    // Create a formatted message with HTTP verb and route
    const formattedRoutes = sortedEndpoints.map(endpoint => {
      // Make it pretty
      return `${endpoint.methods.join(', ').padEnd(10)} ${endpoint.path}`;
    });

    if(msg.robot.adapterName == "slack") {
      msg.send("```" + "\n" + formattedRoutes.join('\n') + "```");
    } else {
      msg.send(formattedRoutes.join('\n'));
    }
  });
};
