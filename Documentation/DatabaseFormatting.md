# Database formatting
A *WoxDB* database is formatted in the *JSON* format.
Every database is setup with the *WoxDB* Core, using the command "FORMAT <file>".
While the core automatically formats it, this documentation can be useful if you are a core developer.

## Base structure
Structure example:
```
{
	"ExampleTable": {
		"0": {
			"ExampleCollumn": "ExampleValue"
		}
	}
}
```