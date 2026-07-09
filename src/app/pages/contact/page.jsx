import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const faq = [
  {
    question: "Where do you ship to?",
    answer: "We ship your most desired items any where you are in the world.",
  },
  {
    question: "How long will my order take?",
    answer:
      "It depends on where you are. Orders processed here will take 2-7 business days to arrive anywhere in Quebec. Outside of Quebec, deliveries can take anywhere from 7-16 days. Delivery details will be provided in your confirmation email with a tracking number.",
  },
  {
    question: "How long am I allowed to return/refund?",
    answer: "Please check our policy page for more details: Refund Policy.",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-[1000px] px-4 py-16 sm:px-6">
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold text-accent">Still got a question?</p>
        <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Contact us!</h1>
        <p className="mt-2 text-sm text-muted">Average Response Time : 1-24 hours</p>
      </div>

      <form className="mx-auto flex max-w-xl flex-col gap-4 rounded-xl bg-surface p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="rounded-lg border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            required
            className="rounded-lg border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none"
          />
        </div>
        <textarea
          name="message"
          placeholder="Message"
          rows={5}
          required
          className="rounded-lg border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none"
        />
        <Button type="submit" className="self-start">
          Send message
        </Button>
      </form>

      <div className="mx-auto mt-16 max-w-2xl">
        <h2 className="text-center text-2xl font-extrabold">FAQ</h2>
        <div className="mt-6 divide-y divide-border rounded-xl bg-surface px-6">
          {faq.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-foreground">
                {item.question}
                <ChevronDown
                  size={16}
                  className="shrink-0 text-muted transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="mt-3 text-sm text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
