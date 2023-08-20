import { getOutputFilePath } from '../utils/paths';
import { validateFile } from './validator';
import { executeCommand } from '../cli/commands';
import { logger } from '../utils';

export async function transpileCobolToC(
	cobolFilePath: string
): Promise<string> {
	const cFilePath = getOutputFilePath(cobolFilePath, '.c');

	if (await validateFile(cobolFilePath)) {
		logger.info(`Validated file at ${cobolFilePath}`);
		await executeCommand(`cobc -C -o ${cFilePath} ${cobolFilePath}`);
		logger.info(`Executed transpilation command for ${cobolFilePath}`);
	}

	return cFilePath;
}
