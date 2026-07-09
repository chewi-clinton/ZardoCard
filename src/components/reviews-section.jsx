import Image from "next/image";
import { Star, BadgeCheck } from "lucide-react";
import { AnimatedRating } from "@/components/animated-rating";
import reviews from "../../data/reviews.json";

function ReviewCard({ review }) {
  return (
    <div className="mx-2 flex w-72 shrink-0 flex-col gap-3 rounded-xl bg-surface p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-foreground">{review.name}</span>
        <Image src="/images/google-logo.png" alt="Google" width={20} height={20} />
      </div>
      <div className="flex items-center gap-2">
        <div className="flex gap-0.5 text-accent">
          {Array.from({ length: review.stars }).map((_, i) => (
            <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
          ))}
        </div>
        <BadgeCheck size={14} className="text-accent" />
        <span className="text-xs text-muted">{review.date}</span>
      </div>
      <p className="text-sm text-muted line-clamp-5">{review.text}</p>
    </div>
  );
}

function ReviewRow({ items, animationDelay }) {
  return (
    <div className="overflow-hidden">
      <div
        className="flex w-max animate-marquee"
        style={animationDelay ? { animationDelay } : undefined}
      >
        {[...items, ...items].map((review, i) => (
          <ReviewCard key={`${review.name}-${i}`} review={review} />
        ))}
      </div>
    </div>
  );
}

export function ReviewsSection() {
  const rowA = reviews.items.filter((_, i) => i % 2 === 0);
  const rowB = reviews.items.filter((_, i) => i % 2 === 1);

  return (
    <section className="w-full py-14">
      <AnimatedRating />
      <p className="mx-auto mt-4 max-w-xl px-4 text-center text-sm text-muted">
        {reviews.intro}
      </p>
      <div className="mt-8 flex flex-col gap-4">
        <ReviewRow items={rowA} />
        <ReviewRow items={rowB} animationDelay="-11s" />
      </div>
      <div className="mt-8 flex justify-center">
        <a
          href="/pages/contact"
          className="inline-flex items-center justify-center rounded-full bg-surface px-6 py-3 text-sm font-bold text-foreground hover:bg-white/10"
        >
          Leave a Review
        </a>
      </div>
    </section>
  );
}
