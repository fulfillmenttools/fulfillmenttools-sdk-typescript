# Using the SDK in the browser

This example shows how you can use the fulfillmenttools SDK directly in the browser.
For a real world project you will probably use a different approach and leverage Node.js along with some frameworks. Nevertheless, using the SDK directly in some plain JavaScript file might come in handy in a prototype or demo scenario.

## Getting started

In this example, we'll use [http-server](https://www.npmjs.com/package/http-server) to serve the static HTML and JavaScript files:

```
npx http-server -o .
```

Now you can point your browser to http://localhost:8080 to launch the example.
Open the developer console with Cmd + Option + J (on a Mac) or Ctrl + Shift + J (on Windows).

## How it works

This example is composed of two files:

* The [index.html](index.html) file shows an input field where to enter a facility ID.
On submit, the SDK fetches the facility details and shows the result in a div block.

In the `head` section of this HTML file, the fulfillmenttools SDK is imported (via [esm.sh](https://esm.sh/)) as well as our little JavaScript example `main.mjs`:

```HTML
<script type="importmap">
  {
    "imports": {
      "@fulfillmenttools/fulfillmenttools-sdk-typescript": "https://esm.sh/@fulfillmenttools/fulfillmenttools-sdk-typescript"
    }
  }
</script>
<script src="./main.mjs" type="module"></script>
```

* The [main.mjs](main.mjs) file initializes the API client and in the `getFacilityDetails` function makes the actual API call to retrieve the details of the specified facility.

In this file you will have to configure your own project credentials:

```JavaScript
var projectId = "<your-fulfillmenttools-project>";
var apiUser = "<your-fulfillmenttools-user>";
var apiPassword = '<your-fulfillmenttools-password>';
var apiKey = '<your-fulfillmenttools-api-key>';
```

Have a look at the `getFacilityDetails` function and use this as a starting point to implement your own ideas!
