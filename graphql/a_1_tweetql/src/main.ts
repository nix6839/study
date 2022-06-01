import server from './server';

const app = await server.listen();
console.log(`Running on ${app.url}`);
