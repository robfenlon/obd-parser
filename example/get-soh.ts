import * as OBD from '../lib/obd-interface.js';
import getConnection from './_getConnection.js';

getConnection(connect => {
  OBD.init(connect)
    .then(function () {
      const sohPoller: OBD.ECUPoller = new OBD.ECUPoller({
        pid: new OBD.PIDS.BatteryStateOfHealth(),
        interval: 1500
      });

      // Bind an event handler for anytime RPM data is available
      sohPoller.on('data', function (output: OBD.OBDOutput) {
        console.log('\n==== SOH Output ====');
        // Timestamp (Date object) for wheb the response was received
        console.log('time: ', output.ts);
        // The bytes returned from the ECU when asked from RPM
        console.log('bytes: ', output.bytes);
        // A value that's usuall numeric e.g 1200
        console.log('value: ', output.value);
        // This will be a value such as "1200rpm"
        console.log('pretty: ', output.pretty);
      });

      sohPoller.startPolling();
    });
});