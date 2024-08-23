const axios = require("axios");

class MnvAdsClient {
    constructor({ publisherKey, adsId, initUri, enrichUri }) {
        this.publisherKey = this.validateProperty("publisherKey", publisherKey);
        this.adsId = this.validateProperty("adsId", adsId);
        this.initUri = this.validateProperty("initUri", initUri);
        this.enrichUri = this.validateProperty("enrichUri", enrichUri);
    }

    validateProperty(propertyName, propertyValue) {
        if (!propertyValue || typeof propertyValue !== "string") {
            throw new Error(
                `"${propertyName}" is required and must be a string`,
            );
        }
        return propertyValue;
    }

    validateUriProperty(propertyName, propertyValue) {
        if (!propertyValue || typeof propertyValue !== "string") {
            throw new Error(
                `"${propertyName}" is required and must be a string`,
            );
        }

        if (!propertyValue.startsWith("http")) {
            throw new Error(`"${propertyName}" must be a valid URI`);
        }
        return propertyValue;
    }

    async init() {
        try {
            const response = await axios.post(this.initUri, {
                publisher_key: this.publisherKey,
                ads_id: this.adsId,
            });
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    async enrich(referenceNo) {
        try {
            const response = await axios.post(this.enrichUri, {
                publisher_key: this.publisherKey,
                ads_id: this.adsId,
                reference_no: referenceNo,
            });
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    async verify() {
        const initResponse = await this.init();
        if (initResponse.error || initResponse.code !== "SUCCESS") {
            return initResponse;
        }
        const referenceNo = initResponse.data.reference_no;
        const enrichResponse = await this.enrich(referenceNo);
        return enrichResponse;
    }
}

module.exports = MnvAdsClient;
