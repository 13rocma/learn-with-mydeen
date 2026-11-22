import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import SocialSignInButtons from "./SocialSignInButtons";

afterEach(cleanup);
it("dispatches Google and Apple to their respective sign-in handlers", () => {
  const onSignIn = vi.fn();
  render(<SocialSignInButtons disabled={false} onSignIn={onSignIn} />);
  fireEvent.click(screen.getByRole("button", { name: "Continuer avec Google" }));
  expect(onSignIn).toHaveBeenNthCalledWith(1, "google");
  fireEvent.click(screen.getByRole("button", { name: "Continuer avec Apple" }));
  expect(onSignIn).toHaveBeenNthCalledWith(2, "apple");
});