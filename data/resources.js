(function(root){
const resources = {
  "routes": {
    "/api/users/1": {
      "id": 1,
      "name": "Ada"
    },
    "/api/users/2": {
      "id": 2,
      "name": "Lin"
    },
    "/api/products": [
      {
        "name": "Pen",
        "price": 2
      },
      {
        "name": "Notebook",
        "price": 5
      },
      {
        "name": "Lamp",
        "price": 20
      }
    ],
    "/api/settings": {
      "theme": "dark",
      "notifications": true
    },
    "/api/pages/1": {
      "items": [
        "alpha",
        "beta"
      ],
      "next": "/api/pages/2"
    },
    "/api/pages/2": {
      "items": [
        "gamma"
      ],
      "next": "/api/pages/3"
    },
    "/api/pages/3": {
      "items": [
        "delta"
      ],
      "next": null
    }
  },
  "behavior": {
    "default": "Requests resolve after 80ms. Unknown local routes return 404 with {error: 'Not found'}. Nonlocal URLs reject.",
    "/api/network-error": "Rejects with TypeError to simulate a lost connection.",
    "/api/bad-json": "Returns HTTP 200, but json() rejects with SyntaxError.",
    "/api/flaky": "First request returns 503; later requests return 200 with {message: 'Recovered'}.",
    "/api/search?q=TEXT": "Returns {label: 'Results for TEXT'}. One-character queries take 450ms; others take 80ms.",
    "/api/slow": "Resolves after 500ms with {message: 'Finished'}. Supports AbortController signals.",
    "/api/rsvp": "POST a JSON body {name: string} with Content-Type application/json. Returns 201 with {name, registered: true}; invalid requests return 400."
  },
  "modules": {
    "@practice/money": "export function formatMoney(value) { return '$' + value.toFixed(2); }",
    "@practice/stats": "export function mean(values) { return values.length ? values.reduce((a,b) => a+b, 0) / values.length : null; }\nexport function extent(values) { return values.length ? [Math.min(...values), Math.max(...values)] : null; }"
  }
};
if(typeof module==="object"&&module.exports)module.exports=resources;
else root.CodeDailyResources=resources;
})(typeof globalThis!=="undefined"?globalThis:this);
