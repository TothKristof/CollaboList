
import { ExternalServiceError, ParseError } from "../../errors/AppError.js";
import MockAdapter from "axios-mock-adapter";
import { resetDatabase, disconnectDatabase } from "../helpers/dbSetup.js";
import { itemService } from "../../services/item.service.js";
import axios from "axios";

const mock = new MockAdapter(axios, { onNoMatch: "passthrough" });

beforeEach(async () => {
    await resetDatabase();
    mock.reset();
});

afterAll(async () => {
    await disconnectDatabase();
    mock.restore();
});
describe("fetch price from external site", () => {
    it("should throw external error on invalid url", async () => {
        await expect(itemService.fetchPriceFromUrl("sdfgkbshjg")).rejects.toThrow(ExternalServiceError);
    });

    it("should return valid numeric price", async () => {
        const price = await itemService.fetchPriceFromUrl("https://www.arukereso.hu/hutoszekreny-fagyaszto-c3168/lg/gsxv91mcae-p963605004/#termek-leiras")
        expect(price).toBeGreaterThanOrEqual(0);
    });
    it("throws ParseError when .price selector returns no valid number", async () => {
        mock.onGet("https://example.com").reply(200, "<html><div class='price'>N/A</div></html>");

        await expect(itemService.fetchPriceFromUrl("https://example.com"))
            .rejects.toThrow("price — .price selector returned no valid number");
    });
})

describe("fetchImageFromUrl", () => {

    it("should return image src when valid HTML is provided", async () => {
        mock.onGet("https://example.com").reply(
            200,
            `<div class="product-image-wrapper">
                <img src="https://image.com/test.jpg" />
             </div>`
        );

        const result = await itemService.fetchImageFromUrl("https://example.com");

        expect(result).toBe("https://image.com/test.jpg");
    });

    it("should throw ParseError when image is missing", async () => {
        mock.onGet("https://example.com").reply(
            200,
            `<div>No image here</div>`
        );

        await expect(
            itemService.fetchImageFromUrl("https://example.com")
        ).rejects.toThrow(ParseError);
    });

    it("should throw ParseError when img has no src", async () => {
        mock.onGet("https://example.com").reply(
            200,
            `<div class="product-image-wrapper">
                <img />
             </div>`
        );

        await expect(
            itemService.fetchImageFromUrl("https://example.com")
        ).rejects.toThrow(ParseError);
    });

    it("should throw ExternalServiceError on HTTP error", async () => {
        mock.onGet("https://example.com").reply(500);

        await expect(
            itemService.fetchImageFromUrl("https://example.com")
        ).rejects.toThrow(ExternalServiceError);
    });

    it("should throw ExternalServiceError on network error", async () => {
        mock.onGet("https://example.com").networkError();

        await expect(
            itemService.fetchImageFromUrl("https://example.com")
        ).rejects.toThrow(ExternalServiceError);
    });

    it("should throw ExternalServiceError on timeout", async () => {
        mock.onGet("https://example.com").timeout();

        await expect(
            itemService.fetchImageFromUrl("https://example.com")
        ).rejects.toThrow(ExternalServiceError);
    });

    it("should throw ExternalServiceError on invalid URL", async () => {
        await expect(
            itemService.fetchImageFromUrl("not-a-valid-url")
        ).rejects.toThrow(ExternalServiceError);
    });

    it("should correctly extract relative image URL", async () => {
        mock.onGet("https://example.com").reply(
            200,
            `<div class="product-image-wrapper">
                <img src="/images/test.jpg" />
             </div>`
        );

        const result = await itemService.fetchImageFromUrl("https://example.com");

        expect(result).toBe("/images/test.jpg");
    });
});