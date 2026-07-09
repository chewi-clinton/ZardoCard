import { ButtonLink } from "@/components/ui/button";

export default function SellYourCollectionPage() {
  return (
    <div className="mx-auto flex w-full max-w-[700px] flex-col items-center gap-4 px-4 py-24 text-center sm:px-6">
      <h1 className="text-3xl font-extrabold sm:text-4xl">Sell Your Collection</h1>
      <p className="max-w-md text-sm text-muted">
        Looking to sell your Pokémon cards, slabs, or sealed product? Reach out
        to our team with details about your collection and we&apos;ll get back
        to you.
      </p>
      <ButtonLink href="/pages/contact" className="mt-2">
        Contact Us
      </ButtonLink>
    </div>
  );
}
