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
import MnvAdsClient from "mnv-ads-client";
```

## Creating an instance of the library

Create an instance of the AdLibrary class, passing your publisherKey and adsId as arguments:

```javascript
const adLibrary = new AdLibrary(
    "YOUR_PUBLISHER_KEY",
    "YOUR_ADS_ID",
    "MNV ADS INIT URI",
    "MNV ADS ENRICH URI",
);
```

Replace YOUR_PUBLISHER_KEY and YOUR_ADS_ID with your actual publisher key and ads ID.

## Using the library methods

The MNV Ads Client instance has three methods: init, enrich, and initAndEnrich.

### init method

Makes a POST request to https://{{mnv-ads-uri}}/webhook/init with the publisherKey and adsId as payload.

```javascript
adLibrary
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
adLibrary
    .enrich(referenceId)
    .then((response) => {
        console.log(response); // response from https://{{mnv-ads-uri}}/webhook/enrich
    })
    .catch((error) => {
        console.error(error); // error response from https://{{mnv-ads-uri}}/webhook/enrich
    });
```

## verivy method

Calls init and then enrich sequentially.

```javascript
adLibrary
    .initAndEnrich()
    .then((response) => {
        console.log(response); // response from https://{{mnv-ads-uri}}/webhook/enrich
    })
    .catch((error) => {
        console.error(error); // error response from either init or enrich
    });
```

## Dependencies

The ad-library library depends on axios for making HTTP requests.

## License

The ad-library library is licensed under the MIT License.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request to contribute to the library.

## Support

If you have any questions or need support, please open an issue or contact the maintainers.
