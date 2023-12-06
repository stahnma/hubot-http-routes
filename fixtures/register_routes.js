// Description:
//   Register routes for hubot
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   None
//
// Author:
//   stahnma
//
// Category: workflow
module.exports = (robot) => {
  robot.router.get('/route', (req, res) => {
    res.send("Hello World");
  });
  robot.router.get('/params/:item', (req, res) => {});
  robot.router.post('/params/:item', (req, res) => {});
};
