# Environment variables with types

Are you tired of converting environment variables to their respective types, like me? Then this package is for you! This package converts the values of environment variables to their respective types, so you don't have to worry about it anymore.

It supports it all (I think, except functions, of course): numbers, booleans, strings, null, undefined, arrays and objects. It also supports nested objects and arrays, in other words, it supports JSON.

## Installation

```bash
npm install env-types
```

## Usage
The package uses static properties to store the environment variables, so you can access them directly from the Environment class. The properties are named after the environment variables.

This means they only have to be loaded once, and you can access them from anywhere in your code, without having to pass them around or load them over and over again.

If you're using environment variables that are loaded in runtime, you'll need to call the load method before accessing them. If they are already loaded, you don't need to do anything, just access them, lay back and enjoy the magic.

### With preloaded environment variables
```js
import { Environment } from 'env-types';

console.log(`Number: ${Environment.NUMBER} - Type: ${typeof Environment.NUMBER}`);
console.log(`Boolean: ${Environment.BOOLEAN} - Type: ${typeof Environment.BOOLEAN}`);
console.log(`String: ${Environment.STRING} - Type: ${typeof Environment.STRING}`);
console.log(`Null: ${Environment.NULL} - Type: ${typeof Environment.NULL}`);
console.log(`Undefined: ${Environment.UNDEFINED} - Type: ${typeof Environment.UNDEFINED}`);
console.log(`Object: ${Environment.OBJECT} - Type: ${typeof Environment.OBJECT}`);
console.log(`Array: ${Environment.ARRAY} - Type: ${typeof Environment.ARRAY} - Is array: ${Array.isArray(Environment.ARRAY)}`);
```

### With environment variables loaded in runtime (using dotenv for example)
```js
import dotenv from 'dotenv';
import { Environment } from 'env-types';

// If you're not adding the environment variables before script execution,
// you'll need to call the load method. Like this:
dotenv.config();
Environment.load();

console.log(`Number: ${Environment.NUMBER} - Type: ${typeof Environment.NUMBER}`);
console.log(`Boolean: ${Environment.BOOLEAN} - Type: ${typeof Environment.BOOLEAN}`);
console.log(`String: ${Environment.STRING} - Type: ${typeof Environment.STRING}`);
console.log(`Null: ${Environment.NULL} - Type: ${typeof Environment.NULL}`);
console.log(`Undefined: ${Environment.UNDEFINED} - Type: ${typeof Environment.UNDEFINED}`);
console.log(`Object: ${Environment.OBJECT} - Type: ${typeof Environment.OBJECT}`);
console.log(`Array: ${Environment.ARRAY} - Type: ${typeof Environment.ARRAY} - Is array: ${Array.isArray(Environment.ARRAY)}`);
```

### Environment variables used in the examples
This is the environment file that I used in the examples above:
```
NUMBER=8
BOOLEAN=true
STRING=hello world
NULL=null
NULL_2=
UNDIFINED=undefined
ARRAY=[1,2,3]
OBJECT={"a":1,"b":2,"c":3}
```

## API

### Environment.load(config?: EnvironmentConfig)
Loads the environment variables. If you're using environment variables that are loaded in runtime, you'll need to call this method before accessing them.

### EnvironmentConfig

##### binaryToBooleans?: boolean
If set to true, the package will convert the string `1` to `true` and the string `0` to `false`.

Default: `true`

##### emptyStringsToNull?: boolean
If set to true, the package will convert empty strings to `null`.

Default: `true`