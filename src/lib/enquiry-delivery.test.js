import { enquiryDelivery } from "./enquiry-delivery";

describe("enquiry delivery", () => {
  test("stays closed and does not expose a send operation", () => {
    expect(enquiryDelivery.enabled).toBe(false);
    expect(enquiryDelivery.futureHoneypotName).toBe("company_website");
    expect(enquiryDelivery).not.toHaveProperty("send");
    expect(enquiryDelivery).not.toHaveProperty("recipient");
  });
});
