import winston from 'winston';

const logger = winston.createLogger({
	level: 'info', // Log only info and more severe messages in production
	format: winston.format.json(), // Log in JSON format
	defaultMeta: { service: 'cobol-wasm-transpiler' }, // Default metadata to include in logs
	transports: [
		new winston.transports.File({ filename: 'error.log', level: 'error' }), // Write all logs error (and below) to `error.log`
		new winston.transports.File({ filename: 'combined.log' }), // Write all logs to `combined.log`
	],
});

if (process.env.NODE_ENV !== 'production') {
	// In development, also log to the `console` with timestamp
	logger.add(
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(), // colorize messages
				winston.format.timestamp(), // prepend timestamp to messages
				winston.format.printf(
					(info) => `${info.timestamp} ${info.level}: ${info.message}`
				) // customize message format
			),
		})
	);
}

export { logger };
