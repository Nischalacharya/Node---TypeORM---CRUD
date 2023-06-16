import { EnvironmentConfig } from './EnvironmentConfig';

/**
 * Environment variables with type conversion.
 * Has all the environment variables as properties.
 * Supports number, boolean string, null, undefined, array and object (JSON).
 *
 * If you're not adding the environment variables before script execution, you'll need to call the load method.
 *
 * @example
 * import { Environment } from 'env-types';
 *
 * // If you're not adding the environment variables before script execution,
 * // you'll need to call the load method. Like this:
 * import dotenv from 'dotenv';
 * dotenv.config();
 * Environment.load();
 *
 * console.log(`Number: ${Environment.NUMBER} - Type: ${typeof Environment.NUMBER}`);
 * console.log(`Boolean: ${Environment.BOOLEAN} - Type: ${typeof Environment.BOOLEAN}`);
 * console.log(`String: ${Environment.STRING} - Type: ${typeof Environment.STRING}`);
 */
export class Environment {

	static [key: string]: string | number | boolean | { [key: string]: any } | any[] | null | undefined;

	/**
	 * Loads the environment variables.
	 *
	 * @param {Object} config The configuration object.
	 * @param {boolean} config.binaryToBooleans If true, it will convert 1 and 0 to booleans.
	 * @param {boolean} config.emptyStringsToNull If true, it will convert empty strings to null.
	 *
	 * @returns {Environment} The Environment class with the environment variables as properties.
	 */
	static load(config: EnvironmentConfig = {
		// If true, it will convert 1 and 0 to booleans.
		binaryToBooleans: true,
		// If true, it will convert empty strings to null.
		emptyStringsToNull: true
	}): Environment {
		// Get the current environment variables.
		const env = process.env;

		// Loop through the environment variables.
		for (const key in env) {
			// Get the value.
			const value = env[key] ?? '';

			// Check if the value is a boolean.
			const lowerCaseValue = value.trim().toLowerCase();
			if (lowerCaseValue === 'true') {
				Environment[key] = true;
				continue;
			} else if (lowerCaseValue === 'false') {
				Environment[key] = false;
				continue;
			}

			// Check if the value is a binary boolean.
			if (config.binaryToBooleans) {
				if (lowerCaseValue === '1') {
					Environment[key] = true;
					continue;
				} else if (lowerCaseValue === '0') {
					Environment[key] = false;
					continue;
				}
			}

			// Check if the value is null.
			if (lowerCaseValue === 'null' || (config.emptyStringsToNull && lowerCaseValue === '')) {
				Environment[key] = null;
				continue;
			}

			// Check if the value is undefined.
			if (lowerCaseValue === 'undefined') {
				Environment[key] = undefined;
				continue;
			}

			// Check if the value is a number.
			const number = Number(value);
			if (!isNaN(number)) {
				Environment[key] = number;
				continue;
			}

			// Check if the value is an array or object (JSON).
			try {
				const json = JSON.parse(value);

				Environment[key] = json;
				continue;
			} catch {
				// Do nothing.
			}

			// The value is a string.
			Environment[key] = value;
		}

		return Environment;
	}

	static {
		this.load();
	}
}
