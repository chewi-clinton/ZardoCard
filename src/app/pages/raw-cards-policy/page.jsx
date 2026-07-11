import { PolicyPage } from "@/components/policy-page";
import policies from "../../../../data/policies.json";

export const metadata = {
  title: "Raw Cards & Sealed Policy",
  description:
    "How ZardoCards grades raw card condition (Mint to Damaged) and sealed product condition, and our final-sale policy on graded conditions.",
  alternates: { canonical: "/pages/raw-cards-policy" },
};

export default function RawCardsPolicyPage() {
  const policy = policies["raw-cards-policy"];
  return <PolicyPage title={policy.title} bodyHtml={policy.bodyHtml} />;
}
