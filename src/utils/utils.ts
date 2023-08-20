import fs, { PathLike } from 'fs';
import { promisify } from 'util';
import { FileReadError, FileWriteError } from './error';
import { logger } from './logger';

export function handleError(error: Error): void {
	logger.error('An error occurred:');
	logger.error(error.message);
	process.exit(1);
}

export const readFile = async (
	path: PathLike,
	encoding: BufferEncoding = 'utf8'
): Promise<string> => {
	try {
		const readFilePromise = promisify(fs.readFile);
		return await readFilePromise(path, encoding);
	} catch (error) {
		throw new FileReadError(`Failed to read file at ${path}`);
	}
};

export const writeFile = async (path: PathLike, data: any): Promise<void> => {
	try {
		const writeFilePromise = promisify(fs.writeFile);
		await writeFilePromise(path, data);
	} catch (error) {
		throw new FileWriteError(`Failed to write file at ${path}`);
	}
};
