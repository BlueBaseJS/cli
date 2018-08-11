import winston from 'winston';
import { addColorToLabel } from './colorFormatter';
import notifyFormatter from './notifyFormatter';

const alignedWithColorsAndTime = winston.format.combine(
	notifyFormatter(),
	addColorToLabel(),
	winston.format.colorize(),
	winston.format.timestamp(),
	winston.format.align(),
	winston.format.printf((info) => {
		const {
			timestamp, level, label, message, ...args
		} = info;

		const labelStr = label ? `${label} ` : '';
		// const ts = timestamp.slice(0, 19).replace('T', ' ');
		return `${labelStr}${level}: ${message}	${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
	}),
);

const logger = winston.createLogger({
	transports: [
		new winston.transports.Console({
			// colorize: true,
			format: alignedWithColorsAndTime,
			// prettyPrint: true,
		}),
		// new winston.transports.File({ filename: 'combined.log' })
	]
});

export default logger;
