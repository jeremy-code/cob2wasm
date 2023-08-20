import { getOutputFilePath } from '../utils/paths';
import { validateFile } from './validator';
import { executeCommand } from '../cli/commands';
import { logger } from '../utils';

export async function compileCToWasm(cFilePath: string): Promise<string> {
	const wasmFilePath = getOutputFilePath(cFilePath, '.wasm');

	if (await validateFile(cFilePath)) {
		logger.info(`Validated file at ${cFilePath}`);
		await executeCommand(
			`emcc -I/usr/local/include ${cFilePath} -s WASM=1 -o ${wasmFilePath}`
		);
		logger.info(`Executed compilation command for ${cFilePath}`);
	}

	return wasmFilePath;
}
