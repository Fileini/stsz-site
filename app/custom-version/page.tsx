import Breadcrumb from "@/components/Common/Breadcrumb";
import TextSubmissionForm from "@/components/Common/TextSubmissionForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Version Request | StorySizer",
  description:
    "Request a custom StorySizer version tailored to your team workflow, governance rules, and estimation process.",
  alternates: {
    canonical: "/custom-version",
  },
  openGraph: {
    title: "Custom Version Request | StorySizer",
    description:
      "Describe your requirements and request a tailored StorySizer setup.",
    url: "/custom-version",
    siteName: "StorySizer",
    type: "website",
  },
};

const CustomVersionPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Custom Version Request"
        description="Describe the workflow, constraints, and integrations you need. We will review your request and reply by email."
      />
      <TextSubmissionForm
        title="Request a custom StorySizer version"
        caption="Use this form to tell us what kind of tailored version you need: team setup, estimation flow, governance rules, and any specific requirements."
        submissionType="custom-version"
        submitLabel="Send Request"
      />
    </>
  );
};

export default CustomVersionPage;
