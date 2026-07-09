import { Star, BadgeCheck } from "lucide-react";
import reviews from "../../data/reviews.json";

function ReviewCard({ review }) {
  return (
    <div className="flex w-72 shrink-0 snap-start flex-col gap-3 rounded-xl bg-surface p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-foreground">{review.name}</span>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#4285F4]">
          G
        </span>
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

export function ReviewsSection() {
  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 py-14 sm:px-6">
      <p className="mx-auto max-w-xl text-center text-sm text-muted">
        {reviews.intro}
      </p>
      <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {reviews.items.map((review) => (
          <ReviewCard key={review.name} review={review} />
        ))}
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
