# hubot-http-routes

This is a simple module that will show (via chat interface) what http routes have been registered within hubot. This is helpful if you're always building new things and can't remember the exact endpoints for some features. It's also helpful if you just want to show off some of the easy extensibility of hubot.

:warning:  This displays all routes registered via 'robot.router' (which is an express router). If you've made your own listeners somehow, those wont' be shown in all liklihood. 

:warning: If you don't have the express server enabled, the routes are still registered, but will be unreachable. This module has no awareness of that.


# Installation
   
   `npm i --save hubot-http-routes`

    add `hubot-http-routes` to `external-scripts.json`.

# Testing

  `npm install`
  `npm t`

# License
MIT
