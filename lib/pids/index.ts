'use strict';

import { map, find, keys } from 'ramda';
import { PID } from './pid.js';
import PIDS from '../pids.js';
import { PIDInfo } from '../interfaces.js';

/**
 * Allows us to get a PID instance by matching an output hex code to
 * the code stored in the PID class.
 */
export function getPidByPidCode (pidstring: string) : PID|null {
  let names:Array<string> = keys(PIDS);

  let pidname: string | undefined = find((name:string) => {
    let curpid:PID = (PIDS as { [key: string]: PID })[name];

    return curpid.getPid() === pidstring;
  })(names);

  if (pidname) {
    return (PIDS as { [key: string]: PID })[pidname];
  } else {
    return null;
  }
};


/**
 * Returns a list that describes the supported PIDs.
 * List includes the PID code and name.
 */
export function getSupportedPidInfo () {
  return map((p: PID) => {
    let ret: PIDInfo = {
      name: p.getName(),
      pid: p.getPid()
    };

    return ret;
  })(PIDS);
};
