declare module 'input' {
    const input: any; // Use 'any' as a placeholder. Replace 'any' with the actual type if known.
    export default input;
}

declare module 'obd-parser-serial-connection' {
    export function getConnector(options: any): any;
    export function listConnectors(callback: (connectors: string[]) => void, errorCallback?: (error: any) => void): void;
}