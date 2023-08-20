import { program } from 'commander';
import { transpileCobolToC } from '../compilation/transpiler';
import { compileCToWasm } from '../compilation/compiler';
import { runWasm } from '../runtime/runtime';
import { logger } from '../utils/logger';

type Options = {
	file: string;
	run: boolean;
};

async function main(options: Options) {
	logger.info(`Transpiling COBOL code in ${options.file} to C...`);
	const cFilePath = await transpileCobolToC(options.file);
	logger.info(`Compiled C code saved in ${cFilePath}`);

	logger.info(`Compiling C code in ${cFilePath} to WebAssembly...`);
	const wasmFilePath = await compileCToWasm(cFilePath);
	logger.info(`Compiled WebAssembly code saved in ${wasmFilePath}`);

	if (options.run) {
		logger.info(`Running the compiled WebAssembly code...`);
		await runWasm(wasmFilePath);
	}
}

program
	.version('1.0.0')
	.requiredOption('-f, --file <path>', 'COBOL source file')
	.option('-r, --run', 'run the compiled WebAssembly code')
	.action(main);

program.parse(process.argv);
