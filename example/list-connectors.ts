import { listConnectors } from 'obd-parser-serial-connection';

console.log('List of possible connections:');
listConnectors((c: Connector[]) => {
    c.forEach(connector => {
        console.log(`${connector.path} (${connector.friendlyName})`);
    });

    if (c.length === 0) {
        console.log('None 😢');
    }
}, console.error);