import { readFile, handleError } from '../utils';

export async function validateFile(filePath: string) {
	try {
		const content = await readFile(filePath, 'utf8');

		if (content.length === 0) {
			throw new Error('File is empty.');
		}

		return true;
	} catch (error: unknown) {
		if (error instanceof Error) {
			handleError(error);
		} else {
			throw new Error('An unknown error occurred.');
		}
	}
}
