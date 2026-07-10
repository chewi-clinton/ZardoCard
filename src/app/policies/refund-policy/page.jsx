import { PolicyPage } from "@/components/policy-page";
import policies from "../../../../data/policies.json";

export default function RefundPolicyPage() {
  const policy = policies["refund-policy"];
  return <PolicyPage title={policy.title} bodyHtml={policy.bodyHtml} />;
}
