import { PolicyPage } from "@/components/policy-page";
import policies from "../../../../data/policies.json";

export const metadata = {
  title: "Refund Policy",
  description:
    "ZardoCards' return and refund policy: all sales are final except for wrong or damaged items reported within 7 days.",
  alternates: { canonical: "/policies/refund-policy" },
};

export default function RefundPolicyPage() {
  const policy = policies["refund-policy"];
  return <PolicyPage title={policy.title} bodyHtml={policy.bodyHtml} />;
}
