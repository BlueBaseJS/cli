import notifier from 'node-notifier';
import winston from 'winston';

const alignedWithColorsAndTime = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf((info) => {
      const {
        timestamp, level, title, message, notify, ...args
      } = info;

			if (notify) {
				notifier.notify({
					title,
					message,
				});
			}

			const label = title ? `${title} ` : '';
      // const ts = timestamp.slice(0, 19).replace('T', ' ');
			return `${label}${level}: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
    }),
  );

const logger = winston.createLogger({
	transports: [
		new winston.transports.Console({
			format: alignedWithColorsAndTime
		}),
		// new winston.transports.File({ filename: 'combined.log' })
	]
});

export default logger;
