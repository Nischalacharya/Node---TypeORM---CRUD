/**
 * The environment configuration.
 */
export interface EnvironmentConfig {
	/**
	 * If true, it will convert 1 and 0 to booleans.
	 */
	binaryToBooleans?: boolean,
	
	/**
	 * If true, it will convert empty strings to null.
	 */
	emptyStringsToNull?: boolean
}