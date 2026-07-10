import { PolicyPage } from "@/components/policy-page";
import policies from "../../../../data/policies.json";

export default function TermsOfServicePage() {
  const policy = policies["terms-of-service"];
  return <PolicyPage title={policy.title} bodyHtml={policy.bodyHtml} />;
}
