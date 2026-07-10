import { PolicyPage } from "@/components/policy-page";
import policies from "../../../../data/policies.json";

export default function ShippingPolicyPage() {
  const policy = policies["shipping-policy"];
  return <PolicyPage title={policy.title} bodyHtml={policy.bodyHtml} />;
}
