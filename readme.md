# MNV ADS Client Library

A JavaScript library for MNV Ads Client

## Installation

You can install the `mnv-ads-client` using npm

```
npm install mnv-ads-client
```

## Usage

### Importing the library

In your JavaScript file, import the `MNV Ads Client` class:

```javascript
import mnvAdsClient from "mnv-ads-client";
```

## Creating an instance of the library

Create an instance of the MnvAdsClient class, passing your publisherKey and adsId as arguments:

```javascript
const mnvAdsClient = new MnvAdsClient({
    publisherKey: "YOUR_PUBLISHER_KEY", //STRING, REQUIRED
    adsId: "YOUR_ADS_ID", // STRING, REQUIRED
    initUri: "MNV ADS INIT URI", // STRING, REQUIRED
    enrichUri: "MNV ADS ENRICH URI", // STRING, REQUIRED,
    initTimeout: 5000, // NUMBER, OPTIONAL
    enrichTimeout: 5000, // NUMBER, OPTIONAL
});
```

Replace YOUR_PUBLISHER_KEY and YOUR_ADS_ID with your actual publisher key and ads ID.
Replace MNVA ADS INIT URI and MNV ADS ENRICH URI with information about these URI's from administator
Optionally, you can set request timeout for init and enrich request timeout using number in millisecond. The default timeout for both of them are 5000 milliseconds (5 seconds)

## Using the library methods

The MNV Ads Client instance has three methods: init, enrich, and initAndEnrich.

### init method

Makes a POST request to https://{{mnv-ads-uri}}/webhook/init with the publisherKey and adsId as payload.

```javascript
mnvAdsClient
    .init()
    .then((response) => {
        console.log(response); // response from https://{{mnv-ads-uri}}/webhook/init
    })
    .catch((error) => {
        console.error(error); // error response from https://{{mnv-ads-uri}}/webhook/init
    });
```

### enrich method

Makes a POST request to https://{{mnv-ads-uri}}/webhook/enrich with the publisherKey, adsId, and referenceId as payload.

```javascript
const referenceId = "REFERENCE_ID_FROM_INIT_RESPONSE";
mnvAdsClient
    .enrich(referenceId)
    .then((response) => {
        console.log(response); // response from https://{{mnv-ads-uri}}/webhook/enrich
    })
    .catch((error) => {
        console.error(error); // error response from https://{{mnv-ads-uri}}/webhook/enrich
    });
```

## verify method

Calls init and then enrich sequentially.

```javascript
mnvAdsClient
    .verify()
    .then((response) => {
        console.log(response); // response from https://{{mnv-ads-uri}}/webhook/enrich
    })
    .catch((error) => {
        console.error(error); // error response from either init or enrich
    });
```

## Dependencies

The mnv-ads-client library depends on axios for making HTTP requests.

## License

The mnv-ads-client library is licensed under the MIT License.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request to contribute to the library.

## Support

If you have any questions or need support, please open an issue or contact the maintainers.
