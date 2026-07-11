import { PolicyPage } from "@/components/policy-page";
import policies from "../../../../data/policies.json";

export const metadata = {
  title: "Shipping Policy",
  description:
    "ZardoCards ships worldwide from Canada. Orders process within 24 hours, with tracking included on every shipment.",
  alternates: { canonical: "/policies/shipping-policy" },
};

export default function ShippingPolicyPage() {
  const policy = policies["shipping-policy"];
  return <PolicyPage title={policy.title} bodyHtml={policy.bodyHtml} />;
}
