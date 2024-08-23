import axios from "axios";

class MnvAdsClient {
    constructor(publisherKey, adsId, initUri, enrichUri) {
        this.publisherKey = publisherKey;
        this.adsId = adsId;
        this.initUri = initUri;
        this.enrichUri = enrichUri;
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

    async enrich(referenceId) {
        try {
            const response = await axios.post(this.enrichUri, {
                publisher_key: this.publisherKey,
                ads_id: this.adsId,
                reference_id: referenceId,
            });
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    async verify() {
        const initResponse = await this.init();
        if (initResponse.error) {
            return initResponse;
        }
        const referenceId = initResponse.reference_id;
        const enrichResponse = await this.enrich(referenceId);
        return enrichResponse;
    }
}

export default MnvAdsClient;
