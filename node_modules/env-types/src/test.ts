import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { Environment } from './Environment';

describe('Checking number', () => {
	it('should be a number', () => {
		assert.strictEqual(typeof Environment.NUMBER, 'number');
	});
	it('should be 1', () => {
		assert.strictEqual(Environment.NUMBER, 8);
	});
});

describe('Checking boolean', () => {
	it('should be a boolean', () => {
		assert.strictEqual(typeof Environment.BOOLEAN, 'boolean');
	});
	it('should be true', () => {
		assert.strictEqual(Environment.BOOLEAN, true);
	});
});

describe('Checking string', () => {
	it('should be a string', () => {
		assert.strictEqual(typeof Environment.STRING, 'string');
	});
	it('should be "string"', () => {
		assert.strictEqual(Environment.STRING, 'hello world');
	});
});

describe('Checking null', () => {
	it('should be null', () => {
		assert.strictEqual(Environment.NULL, null);
	});
	it('should also be null', () => {
		assert.strictEqual(Environment.NULL_2, null);
	});
});

describe('Checking undefined', () => {
	it('should be undefined', () => {
		assert.strictEqual(Environment.UNDEFINED, undefined);
	});
});

describe('Checking array', () => {
	it('should be an array', () => {
		assert.strictEqual(Array.isArray(Environment.ARRAY), true);
	});
	it('should be [1, 2, 3]', () => {
		assert.deepStrictEqual(Environment.ARRAY, [1, 2, 3]);
	});
});

describe('Checking object', () => {
	it('should be an object', () => {
		assert.strictEqual(typeof Environment.OBJECT, 'object');
	});
	it('should be { a: 1, b: 2, c: 3 }', () => {
		assert.deepStrictEqual(Environment.OBJECT, { a: 1, b: 2, c: 3 });
	});
});