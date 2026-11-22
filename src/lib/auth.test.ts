import { describe, expect, it } from "vitest";
import { signupSchema, resetSchema, safeDestination, authError, socialRegistrationSchema } from "./auth";

const account = { prenom: "Amine", email: "amine@example.com", password: "abcdefgh", privacy: true, marketing_consent: false };
describe("account rules", () => {
  it("requires privacy acceptance and a first name for social registration, not marketing", () => {
    expect(socialRegistrationSchema.safeParse({ prenom: "Amine", privacy: true, marketing_consent: false }).success).toBe(true);
    expect(socialRegistrationSchema.safeParse({ prenom: "Amine", privacy: false, marketing_consent: false }).success).toBe(false);
    expect(socialRegistrationSchema.safeParse({ prenom: "", privacy: true, marketing_consent: false }).success).toBe(false);
  });
  it("requires at least eight password characters", () => {
    expect(signupSchema.safeParse({ ...account, password: "abcdefg" }).success).toBe(false);
    expect(signupSchema.safeParse(account).success).toBe(true);
    expect(resetSchema.safeParse({ password: "abcdefg", confirmation: "abcdefg" }).success).toBe(false);
  });
  it("requires privacy acceptance", () => {
    expect(signupSchema.safeParse({ ...account, privacy: false }).success).toBe(false);
    expect(signupSchema.safeParse(account).success).toBe(true);
  });
  it("allows marketing to be declined", () => {
    expect(signupSchema.parse(account).marketing_consent).toBe(false);
    expect(signupSchema.parse({ ...account, marketing_consent: true }).marketing_consent).toBe(true);
  });
  it("requires matching new passwords", () => {
    expect(resetSchema.safeParse({ password: "abcdefgh", confirmation: "different" }).success).toBe(false);
    expect(resetSchema.safeParse({ password: "abcdefgh", confirmation: "abcdefgh" }).success).toBe(true);
  });
  it("preserves app destinations without permitting external redirects", () => {
    expect(safeDestination("/priere?step=2")).toBe("/priere?step=2");
    for (const path of ["https://evil.example", "//evil.example", "/\\evil.example", "/auth", "/"]) expect(safeDestination(path)).toBe("/bases");
  });
  it("explains the email confirmation requirement", () => {
    expect(authError({ code: "email_not_confirmed", message: "x" })).toContain("Confirmez votre adresse email");
  });
});