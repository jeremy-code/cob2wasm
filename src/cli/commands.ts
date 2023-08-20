import { exec as execCallback } from 'child_process';
import { promisify } from 'util';
import { CommandExecutionError } from '../utils/error';

const exec = promisify(execCallback);

export async function executeCommand(command: string): Promise<void> {
	try {
		await exec(command);
	} catch (error) {
		throw new CommandExecutionError(`Failed to execute command: ${command}`);
	}
}
