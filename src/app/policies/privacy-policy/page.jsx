import { PolicyPage } from "@/components/policy-page";
import policies from "../../../../data/policies.json";

export default function PrivacyPolicyPage() {
  const policy = policies["privacy-policy"];
  return <PolicyPage title={policy.title} bodyHtml={policy.bodyHtml} />;
}
