import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const state = vi.hoisted(() => ({ user: null as null | { id: string }, loading: false, recovering: false }));
vi.mock("@/contexts/AuthContext", () => ({ useAuth: () => state }));
afterEach(() => { cleanup(); state.user = null; state.recovering = false; });
function AuthLocation() { const location = useLocation(); return <p>{location.pathname + location.search}</p>; }
function guard(path: string) {
  render(<MemoryRouter initialEntries={[path]}><Routes><Route path="/auth" element={<AuthLocation />} /><Route path="/reset-password" element={<p>Recovery</p>} /><Route element={<ProtectedRoute />}><Route path="*" element={<p>Private page</p>} /></Route></Routes></MemoryRouter>);
}
describe("private app", () => {
  it.each(["/", "/priere", "/sourates", "/alphabet", "/duas", "/ablutions", "/bases", "/installer"])("protects %s and saves its destination", (path) => {
    guard(path);
    expect(screen.getByText(`/auth?next=${encodeURIComponent(path)}`)).toBeInTheDocument();
    expect(screen.queryByText("Private page")).not.toBeInTheDocument();
  });
  it("permits a verified account", () => { state.user = { id: "user" }; guard("/priere"); expect(screen.getByText("Private page")).toBeInTheDocument(); });
  it("sends recovery sessions to password reset instead of the app", () => { state.user = { id: "user" }; state.recovering = true; guard("/priere"); expect(screen.getByText("Recovery")).toBeInTheDocument(); });
});