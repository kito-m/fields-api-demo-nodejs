# Docubee API Fields Demo with Node.js

## Summary

Using the Docubee API, fields can be placed on a document's placeholders which can be used in a fill & sign task. This allows you to programmatically create signature, date, checkbox, initial, and text fields that your users interact with during the workflow runtime.

## API Documentation

Specifics about the Docubee API can be found in the official documentation at [docs.docubee.app](https://docs.ontask.io).

The specific endpoints used in this sample are:

- [Upload a Document](https://docs.docubee.app/?javascript#upload)
- [Set Document Fields](https://docs.docubee.app/?javascript#fields)

## Preparation

- An API key is generated for the workspace with at least the `Upload documents` and `Set document fields` permissions.
- An environment variable `YOUR_API_TOKEN` is set with the API key value. 

## Usage

```shell
node index.js
```
