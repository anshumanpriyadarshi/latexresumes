// Branded types — prevent passing raw strings where validated types are expected.
// Zod schemas in packages/shared/schemas/ are the ONLY way to construct these.

export type Email       = string & { readonly __brand: 'Email' }
export type PhoneNumber = string & { readonly __brand: 'PhoneNumber' }
export type HttpUrl     = string & { readonly __brand: 'HttpUrl' }

// Resume date strings — intentionally NOT Date objects.
// Reason: resume dates are display strings, not calendar dates.
// Valid values: "May 2024", "Present", "Summer 2023", "2019", "Jun. 2022"
// Using Date would break "Present", force day-of-month assumptions, and
// create lossy round-trips in the .tex exporter. Do not change this.
export type ResumeDate = string;

// Certification expiry — explicit 'never' instead of undefined
// to make .tex serialization unambiguous.
export type CertExpiryDate = ResumeDate | 'never';
