import { useState } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { buildPrayerSequence } from "@/data/prayers";
import PrayerStepTexts from "./PrayerStepTexts";

afterEach(cleanup);

function PrayerTextsHarness({ stepIndex }: { stepIndex: number }) {
  const [visibleTexts, setVisibleTexts] = useState<string[]>(["phonetic"]);
  const step = buildPrayerSequence(2)[stepIndex];
  if (!step) return null;
  return <PrayerStepTexts step={step} visibleTexts={visibleTexts} onVisibleTextsChange={setVisibleTexts} />;
}

describe("prayer text preferences", () => {
  it("keeps Arabic selected and the other texts closed across prayer steps", () => {
    const { rerender } = render(<PrayerTextsHarness stepIndex={0} />);
    fireEvent.click(screen.getByRole("button", { name: "Phonétique" }));
    fireEvent.click(screen.getByRole("button", { name: "Arabe" }));
    for (const stepIndex of [1, 4, 5]) {
      rerender(<PrayerTextsHarness stepIndex={stepIndex} />);
      expect(screen.getByRole("button", { name: "Arabe" })).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByRole("button", { name: "Phonétique" })).toHaveAttribute("aria-expanded", "false");
      expect(screen.getByRole("button", { name: "Traduction" })).toHaveAttribute("aria-expanded", "false");
    }
    // Al-Fatiha currently has only phonetics; passing it must not reset the Arabic choice.
    rerender(<PrayerTextsHarness stepIndex={2} />);
    expect(screen.getByRole("button", { name: "Phonétique" })).toHaveAttribute("aria-expanded", "false");
    rerender(<PrayerTextsHarness stepIndex={4} />);
    expect(screen.getByRole("button", { name: "Arabe" })).toHaveAttribute("aria-expanded", "true");
  });

  it("allows several texts to stay open together on the next step", () => {
    const { rerender } = render(<PrayerTextsHarness stepIndex={0} />);
    fireEvent.click(screen.getByRole("button", { name: "Traduction" }));
    rerender(<PrayerTextsHarness stepIndex={1} />);
    expect(screen.getByRole("button", { name: "Phonétique" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: "Traduction" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: "Arabe" })).toHaveAttribute("aria-expanded", "false");
  });
});