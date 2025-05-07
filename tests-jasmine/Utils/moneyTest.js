import { formateCurrency } from "../../scripts/Utils/money.js";

describe("test suite: formate currency", () => {
    describe("rounding", () => {
        it("convert cents into dollors", () => {
            expect(formateCurrency (2095)).toEqual('20.95');
        });
    
        it("work with 0", () => {
            expect(formateCurrency (0)).toEqual('0.00');
        });
    
        it("rounds up to the nearest cents", () => {
            expect(formateCurrency (2000.5)).toEqual('20.01');
        });
    });
    
});