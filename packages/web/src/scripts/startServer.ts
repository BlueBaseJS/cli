// import { server } from '../server';
// import { Utils } from '@bluebase/cli-core';
// import { ConfigsBundle } from '../helpers';

// let serverObj: any;

// export function startServer(_configs: ConfigsBundle, label: string) {

//   if (serverObj) {
//     serverObj.close();
//     serverObj = null;
//     Utils.logger.log({
//       label,
//       level: 'info',
//       message: 'Restarting server...',
//     });
//   }

//   // serverObj = server(configs);

//   serverObj.on('listening', () => {
//     Utils.logger.log({
//       label,
//       level: 'info',
//       message: 'Server running with latest changes.',
//       notify: true,
//     });
//   });

//   serverObj.on('error', (err: Error) => {
//     Utils.logger.log({
//       err,
//       label,
//       level: 'error',
//       message: 'Error in server execution, check the console for more info.',
//     });
//   });
// }