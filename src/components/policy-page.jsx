export function PolicyPage({ title, bodyHtml }) {
  return (
    <div className="mx-auto w-full max-w-[800px] px-4 py-16 sm:px-6">
      <h1 className="text-center text-3xl font-extrabold sm:text-4xl">{title}</h1>
      <div
        className="prose prose-invert mt-8 max-w-none text-sm text-muted [&_a]:text-accent [&_a]:underline [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-foreground [&_table]:w-full [&_td]:border [&_td]:border-border [&_td]:p-2 [&_th]:border [&_th]:border-border [&_th]:p-2 [&_th]:text-foreground"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />
    </div>
  );
}
