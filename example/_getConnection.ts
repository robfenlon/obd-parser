import input from 'input';
import { getConnector, listConnectors } from 'obd-parser-serial-connection';

export default (cb: (connection: Function) => void) => {
    listConnectors(async (connectors: Connector[]) => {
        if (connectors.length === 0) {
            console.error('No connectors found 😢');
            process.exit();
        }

        const exitOption = { path: 'bye', friendlyName: 'Exit 👋' };
        connectors.unshift(exitOption);

        const choice = await input.select(`Choose a connection to use:`, connectors.map(o => o.friendlyName));
        const connection = connectors.find(c => c.friendlyName === choice);

        if (connection.path === 'bye') {
            process.exit();
        }

        // Returns a function that will allow us to connect to the serial port
        var connect: Function = getConnector({
            serialPath: connection.path,
            baudRate: 38400
        });

        cb(connect);
    }, console.error);
}