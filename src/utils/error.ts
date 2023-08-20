class FileReadError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'FileReadError';
	}
}

class FileWriteError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'FileWriteError';
	}
}

class CommandExecutionError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'CommandExecutionError';
	}
}

export { FileReadError, FileWriteError, CommandExecutionError };
