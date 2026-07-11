import { PolicyPage } from "@/components/policy-page";
import policies from "../../../../data/policies.json";

export const metadata = {
  title: "Terms of Service",
  description: "The terms and conditions governing your use of ZardoCards and its services.",
  alternates: { canonical: "/policies/terms-of-service" },
};

export default function TermsOfServicePage() {
  const policy = policies["terms-of-service"];
  return <PolicyPage title={policy.title} bodyHtml={policy.bodyHtml} />;
}
