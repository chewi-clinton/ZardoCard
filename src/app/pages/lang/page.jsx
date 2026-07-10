import Link from "next/link";

const languageLinks = [
  { label: "Japanese Booster Boxes", href: "/collections/japanese-booster-box" },
  { label: "Japanese Booster Packs", href: "/collections/japanese-booster-packs" },
];

export default function ShopByLanguagesPage() {
  return (
    <div className="mx-auto flex w-full max-w-[700px] flex-col items-center gap-6 px-4 py-24 text-center sm:px-6">
      <h1 className="text-3xl font-extrabold sm:text-4xl">Shop By Languages</h1>
      <div className="flex flex-col gap-3">
        {languageLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full border border-border px-8 py-3 text-sm font-bold text-foreground hover:bg-white/5"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
