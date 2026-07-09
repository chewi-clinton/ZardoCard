import { UserRound, Plane, Headset } from "lucide-react";

const badges = [
  {
    icon: UserRound,
    title: "Secure payment",
    description: "Your payment information is encrypted and securely processed.",
  },
  {
    icon: Plane,
    title: "Fast & Secure shipping",
    description: "Worldwide delivery (duties not included)",
  },
  {
    icon: Headset,
    title: "Customer Service",
    description: "Reach out anytime — we're here Monday–Friday to help",
  },
];

export function TrustBadges() {
  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 pb-16 sm:px-6">
      <div className="flex flex-col items-center gap-2 pb-10 text-center">
        <p className="text-sm font-semibold text-foreground">
          Our customer support is available
        </p>
        <p className="text-sm text-muted">Monday to Friday</p>
        <a
          href="/pages/contact"
          className="mt-3 inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-[15px] font-bold text-accent-foreground hover:bg-accent/90"
        >
          Contact Us
        </a>
      </div>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
        {badges.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex flex-col items-center gap-3 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface">
              <Icon size={22} className="text-foreground" />
            </span>
            <h3 className="text-base font-bold text-foreground">{title}</h3>
            <p className="max-w-[220px] text-sm text-muted">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
