import { PolicyPage } from "@/components/policy-page";
import policies from "../../../../data/policies.json";

export default function RawCardsPolicyPage() {
  const policy = policies["raw-cards-policy"];
  return <PolicyPage title={policy.title} bodyHtml={policy.bodyHtml} />;
}
