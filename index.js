const axios = require("axios");

class MnvAdsClient {
    constructor({
        publisherKey,
        adsId,
        initUri,
        enrichUri,
        initTImeout = 5000,
        enrichTimeout = 5000,
    } = {}) {
        this.publisherKey = this.validateProperty("publisherKey", publisherKey);
        this.adsId = this.validateProperty("adsId", adsId);
        this.initUri = this.validateUriProperty("initUri", initUri);
        this.enrichUri = this.validateUriProperty("enrichUri", enrichUri);
        this.initTImeout = this.validateNumberProperty(
            "initTImeout",
            initTImeout,
        );
        this.enrichTimeout = this.validateNumberProperty(
            "enrichTimeout",
            enrichTimeout,
        );
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

    validateNumberProperty(propertyName, propertyValue) {
        if (
            !propertyValue ||
            typeof propertyValue !== "number" ||
            propertyValue <= 0
        ) {
            throw new Error(
                `"${propertyName}" is required and must be a number greater than 0`,
            );
        }
        return propertyValue;
    }

    async init() {
        try {
            const response = await axios.post(
                this.initUri,
                {
                    publisher_key: this.publisherKey,
                    ads_id: this.adsId,
                },
                { timeout: this.initTImeout },
            );
            return response.data;
        } catch (error) {
            return error.response.data || error;
        }
    }

    async enrich(referenceNo) {
        try {
            const response = await axios.post(
                this.enrichUri,
                {
                    publisher_key: this.publisherKey,
                    ads_id: this.adsId,
                    reference_no: referenceNo,
                },
                { timeout: this.enrichTimeout },
            );
            return response.data;
        } catch (error) {
            return error.response.data || error;
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
