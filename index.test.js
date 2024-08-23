// index.test.js
const axios = require("axios");
const MnvAdsClient = require("./index"); // Replace with the actual class name and path

jest.mock("axios");

describe("YourClass", () => {
    let instance;

    beforeEach(() => {
        instance = new MnvAdsClient({
            publisherKey: "testPublisherKey",
            adsId: "testAdsId",
            initUri: "testInitUri",
            enrichUri: "testEnrichUri",
        });
    });

    describe("init", () => {
        it("should return response data on success", async () => {
            const mockData = { data: "mockData" };
            axios.post.mockResolvedValue({ data: mockData });

            const result = await instance.init();

            expect(result).toEqual(mockData);
            expect(axios.post).toHaveBeenCalledWith(instance.initUri, {
                publisher_key: instance.publisherKey,
                ads_id: instance.adsId,
            });
        });

        it("should return error response data on failure", async () => {
            const mockError = { response: { data: "mockError" } };
            axios.post.mockRejectedValue(mockError);

            const result = await instance.init();

            expect(result).toEqual(mockError.response.data);
        });
    });

    describe("enrich", () => {
        it("should return response data on success", async () => {
            const mockData = { data: "mockData" };
            axios.post.mockResolvedValue({ data: mockData });

            const result = await instance.enrich("testReferenceNo");

            expect(result).toEqual(mockData);
            expect(axios.post).toHaveBeenCalledWith(instance.enrichUri, {
                publisher_key: instance.publisherKey,
                ads_id: instance.adsId,
                reference_no: "testReferenceNo",
            });
        });

        it("should return error response data on failure", async () => {
            const mockError = { response: { data: "mockError" } };
            axios.post.mockRejectedValue(mockError);

            const result = await instance.enrich("testReferenceNo");

            expect(result).toEqual(mockError.response.data);
        });
    });
});
