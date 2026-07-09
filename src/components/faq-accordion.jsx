import { ChevronDown } from "lucide-react";
import faq from "../../data/faq.json";

export function FaqAccordion() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <h2 className="text-center text-4xl font-extrabold uppercase sm:text-5xl">FAQ</h2>
      <p className="mx-auto mt-4 max-w-xl text-center text-sm text-muted">
        Below, you&apos;ll find answers to the most common questions about our
        products, shipping, and policies. If you don&apos;t see your question
        here, feel free to reach out, we&apos;re always happy to assist.
      </p>

      <div className="mt-10 divide-y divide-border rounded-xl bg-surface px-6">
        {faq.map((item) => (
          <details key={item.question} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-foreground">
              {item.question}
              <ChevronDown
                size={16}
                className="shrink-0 text-muted transition-transform group-open:rotate-180"
              />
            </summary>
            <div
              className="prose prose-invert mt-3 max-w-none text-sm text-muted [&_a]:text-accent [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
          </details>
        ))}
      </div>
    </section>
  );
}
