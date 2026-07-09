import Link from "next/link";

const base =
  "inline-flex items-center justify-center rounded-full font-bold text-[15px] px-8 py-3.5 transition-colors duration-150 whitespace-nowrap";

const variants = {
  primary: "bg-accent text-accent-foreground hover:bg-accent/90",
  outline:
    "border border-border text-foreground hover:bg-white/5",
  ghost: "text-foreground hover:bg-white/5",
};

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  href,
  variant = "primary",
  className = "",
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
