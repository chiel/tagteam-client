The app will automatically loop all directories found in this directory and
attempt to apply modules that comply with the following requirements:

- Directory name does not start with a `.` or `_` character
- Directory contains a `routes.json` and `controller.js`

### Routing

The `routes.json` must follow a format that looks something like this:

```json
{
	"/": {
		"get": "dashboard"
  },
	"/register": {
		"get": "register"
  }
}
```

Which essentially follows the structure of:

```json
{
	"/my-route": {
		"http-verb": "function"
  }
}
```

Where function is a function found in the `controller.js`.

