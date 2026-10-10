import { fireEvent, render, screen } from "@testing-library/react";
import ContactPage, { metadata } from "./page";
import { enquiryDelivery } from "@/lib/enquiry-delivery";
import { services } from "@/lib/services";

describe("contact page", () => {
  test("describes a closed enquiry preview and lists the seven services", () => {
    expect(metadata.title).toBe("Contact · AXXIS Works Ltd");
    expect(metadata.description).toMatch(/not available yet/);
    expect(metadata.alternates).toBeUndefined();
    expect(enquiryDelivery.enabled).toBe(false);

    render(<ContactPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Contact" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("status")).toHaveTextContent(
      "Online enquiries are not available yet. Please check back soon.",
    );

    expect(screen.getByLabelText("Full name (required)")).toBeRequired();
    expect(screen.getByLabelText("Email address (required)")).toBeRequired();
    expect(screen.getByLabelText("Message (required)")).toBeRequired();
    expect(
      screen.getByLabelText("Service of interest (optional)"),
    ).not.toBeRequired();

    const service = screen.getByLabelText("Service of interest (optional)");
    for (const item of services) {
      expect(service).toHaveTextContent(item.name);
    }
    expect(service.querySelectorAll("option")).toHaveLength(8);

    for (const field of [
      "Full name (required)",
      "Email address (required)",
      "Service of interest (optional)",
      "Message (required)",
    ]) {
      expect(screen.getByLabelText(field)).toBeDisabled();
    }

    expect(
      screen.getByRole("button", { name: "Enquiry unavailable" }),
    ).toBeDisabled();
    expect(
      screen.queryByText(/message was sent|thank you/i),
    ).not.toBeInTheDocument();
    expect(document.body).not.toHaveTextContent(/company_website|\+44|@/);
    expect(
      screen.queryByRole("link", { name: "Privacy" }),
    ).not.toBeInTheDocument();
  });

  test("does not send or store an enquiry when the form is submitted", () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(null, { status: 500 }));
    render(<ContactPage />);

    fireEvent.submit(screen.getByRole("form", { name: "Enquiry preview" }));

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(window.localStorage.length).toBe(0);
    expect(window.sessionStorage.length).toBe(0);
    expect(document.cookie).toBe("");
    fetchSpy.mockRestore();
  });
});
