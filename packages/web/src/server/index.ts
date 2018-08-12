import server from './server';

console.log('do it already!');
server(JSON.parse(process.env.SERVER_CONFIGS as string));