"use client";

import { services } from "@/lib/services";

const fieldClass =
  "mt-2 w-full rounded-xl border border-border bg-surface px-3 py-2 text-navy disabled:cursor-not-allowed disabled:text-grey";

export function EnquiryPreview() {
  return (
    <form
      aria-labelledby="enquiry-preview-title"
      aria-describedby="enquiry-unavailable"
      autoComplete="off"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <h2
        id="enquiry-preview-title"
        className="text-2xl font-semibold tracking-tight text-navy"
      >
        Enquiry preview
      </h2>
      <p id="enquiry-unavailable" role="status" className="mt-3 text-grey">
        Online enquiries are not available yet. Please check back soon.
      </p>
      <fieldset disabled className="mt-8 grid gap-5">
        <legend className="sr-only">Enquiry fields, unavailable</legend>
        <div>
          <label
            htmlFor="enquiry-name"
            className="text-sm font-semibold text-navy"
          >
            Full name (required)
          </label>
          <input
            id="enquiry-name"
            name="name"
            type="text"
            required
            autoComplete="off"
            className={`${fieldClass} min-h-11`}
          />
        </div>
        <div>
          <label
            htmlFor="enquiry-email"
            className="text-sm font-semibold text-navy"
          >
            Email address (required)
          </label>
          <input
            id="enquiry-email"
            name="email"
            type="email"
            required
            autoComplete="off"
            aria-describedby="enquiry-email-hint"
            className={`${fieldClass} min-h-11`}
          />
          <p id="enquiry-email-hint" className="mt-2 text-sm text-grey">
            An address where a reply could be sent once enquiries are open.
          </p>
        </div>
        <div>
          <label
            htmlFor="enquiry-service"
            className="text-sm font-semibold text-navy"
          >
            Service of interest (optional)
          </label>
          <select
            id="enquiry-service"
            name="service"
            defaultValue=""
            className={`${fieldClass} min-h-11`}
          >
            <option value="">No specific service</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="enquiry-message"
            className="text-sm font-semibold text-navy"
          >
            Message (required)
          </label>
          <textarea
            id="enquiry-message"
            name="message"
            required
            rows={6}
            className={fieldClass}
          />
        </div>
        <button
          type="submit"
          disabled
          className="inline-flex min-h-11 w-fit items-center justify-center justify-self-start rounded-full bg-electric px-5 text-sm font-semibold text-white opacity-70"
        >
          Enquiry unavailable
        </button>
      </fieldset>
    </form>
  );
}
