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
    "http-verb": "definition"
  }
}
```

If you are only specifying a `GET` route, you can also use a shorthand like

```json
{
  "/my-route": "definition"
}
```

`definition` references an object found in the `controller.js` describing the
route which looks something like this:

```javascript
module.exports = {
  definition: {
    header: '/path/to/header.html',
    footer: '/path/to/footer.html',
    body: function(req, res){
      return new Promise(function(resolve){
        resolve('my content');
      });
    }
  }
};
```

The router will render the specified `header` and `footer` and put the contents
which are passed through the `resolve` of the returned Promise in between them.

`header` and `footer` are optional.

