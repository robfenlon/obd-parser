var listConnectors = require('obd-parser-serial-connection').listConnectors;
console.log('List of possible connections:');
listConnectors((c: string[]) => {
    c.forEach(connector => {
        console.log('* ' + connector);
    });

    if (c.length === 0) {
        console.log('None 😢');
    }
}, console.error);