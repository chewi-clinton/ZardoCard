import Image from "next/image";

export function CollectionHero({ title, description, bannerImage }) {
  if (!bannerImage) {
    return (
      <div className="mx-auto w-full max-w-[1400px] px-4 pt-10 sm:px-6">
        <h1 className="text-3xl font-extrabold sm:text-4xl">{title}</h1>
        {description && (
          <div
            className="prose prose-invert mt-3 max-w-2xl text-sm text-muted [&_a]:text-accent [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </div>
    );
  }

  return (
    <section className="relative -mt-28 flex min-h-[280px] items-center justify-center overflow-hidden pt-28 sm:-mt-32 sm:min-h-[340px] sm:pt-32">
      <Image
        src={bannerImage}
        alt={title}
        fill
        priority
        className="object-cover object-center brightness-[0.55]"
      />
      <div className="relative z-10 flex flex-col items-center gap-3 px-6 py-16 text-center">
        <h1 className="max-w-2xl text-3xl font-extrabold sm:text-4xl">{title}</h1>
        {description && (
          <div
            className="prose prose-invert max-w-xl text-sm text-white/90 [&_a]:text-accent [&_a]:underline [&_p]:m-0"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </div>
    </section>
  );
}
