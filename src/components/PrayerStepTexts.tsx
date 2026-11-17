import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { PrayerAnimStep } from "@/data/prayers";

type PrayerStepTextsProps = {
  step: PrayerAnimStep;
  visibleTexts: string[];
  onVisibleTextsChange: (values: string[]) => void;
};

export default function PrayerStepTexts({ step, visibleTexts, onVisibleTextsChange }: PrayerStepTextsProps) {
  const texts = [
    { id: "phonetic", label: "Phonétique", text: step.phonetic, className: "phonetic-text text-base font-semibold" },
    { id: "arabic", label: "Arabe", text: step.arabic, className: "arabic-text text-xl leading-loose" },
    { id: "translation", label: "Traduction", text: step.translation, className: "text-sm text-muted-foreground leading-relaxed" },
  ];

  if (!texts.some(({ text }) => text)) return null;

  return (
    <div>
      <Accordion type="multiple" value={visibleTexts} onValueChange={onVisibleTextsChange}>
        {texts.map(({ id, label, text, className }) => text ? (
          <AccordionItem key={id} value={id} className="border-border last:border-b-0">
            <AccordionTrigger className="gap-3 text-sm text-foreground hover:no-underline">{label}</AccordionTrigger>
            <AccordionContent>
              <p dir={id === "arabic" ? "rtl" : undefined} lang={id === "arabic" ? "ar" : undefined} className={`text-center whitespace-pre-line break-words ${className}`}>{text}</p>
            </AccordionContent>
          </AccordionItem>
        ) : null)}
      </Accordion>
      {step.repeat && (
        <p className="mt-3 text-center text-xs text-primary font-medium">× {step.repeat} fois</p>
      )}
    </div>
  );
}