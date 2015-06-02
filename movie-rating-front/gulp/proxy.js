 /*jshint unused:false */

/***************

  This file allow to configure a proxy system plugged into BrowserSync
  in order to redirect backend requests while still serving and watching
  files from the web project

  IMPORTANT: The proxy is disabled by default.

  If you want to enable it, watch at the configuration options and finally
  change the `module.exports` at the end of the file

***************/

'use strict';

var url = require('url');
var proxy = require('proxy-middleware');
var modRewrite = require('connect-modrewrite');


/*
 * Location of your backend server
 */
var proxyTargetDefault = 'http://localhost:1337/api';
var proxyTarget = process.env.PROXY_TARGET || proxyTargetDefault;
var proxyOptions = url.parse(proxyTarget);
proxyOptions.route = '/api';

var middleWares = [proxy(proxyOptions), modRewrite(['!\\.\\w+$ /index.html [L]'])];

/*
 * This is where you activate or not your proxy.
 *
 * The first line activate if and the second one ignored it
 */

//module.exports = [proxyMiddleware];
module.exports = function() {
  return middleWares;
};

