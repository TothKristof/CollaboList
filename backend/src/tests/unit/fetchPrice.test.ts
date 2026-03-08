
import { ExternalServiceError } from "../../errors/AppError.js";
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