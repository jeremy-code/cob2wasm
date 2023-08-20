import { readFile } from '../utils/utils';
import { WasmFs } from '@wasmer/wasmfs';
import { logger } from '../utils';

export async function runWasm(wasmFilePath: string) {
	const wasmFs = new WasmFs();
	const wasmCode = await readFile(wasmFilePath);
	const wasmModule = await WebAssembly.compile(
		new TextEncoder().encode(wasmCode)
	);
	const wasmInstance = await WebAssembly.instantiate(wasmModule, {
		env: {
			printf: wasmFs.fs.writeSync,
			puts: wasmFs.fs.writeSync,
		},
	});

	logger.info(`Ran WebAssembly code from ${wasmFilePath}`);

	return wasmInstance.exports;
}
