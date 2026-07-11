import { PolicyPage } from "@/components/policy-page";
import policies from "../../../../data/policies.json";

export const metadata = {
  title: "Privacy Policy",
  description: "How ZardoCards collects, uses, and protects your personal information.",
  alternates: { canonical: "/policies/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  const policy = policies["privacy-policy"];
  return <PolicyPage title={policy.title} bodyHtml={policy.bodyHtml} />;
}
