'use strict';

import * as connection from './connection.js';
import * as PIDS from './pids/pid.js';
import generateLogger from './log.js';

const log = generateLogger();

// Export all PIDS classes so they can be passed to an ECUPoller
export { PIDS as PIDS };

// Just export the vanilla ECUPoller class
export { ECUPoller as ECUPoller } from './poller.js';

// Interfaces
export { OBDOutput, PIDInfo, OBDConnection } from './interfaces.js';


/**
 * Initialises this module for usage (no shit - right?)
 * @param  {Object}   opts
 * @return {Promise}
 */
export function init (connectorFn: Function) : Promise<void> {
  log('initialising obd-parser');

  // Expose the connection we've been passed
  connection.setConnectorFn(connectorFn);

  // Call this to get a connection error/success now rather than later
  return connection.getConnection()
    .then(onInitialiseSuccess);


  function onInitialiseSuccess () {
    log('initialised successfully');
  }
};
