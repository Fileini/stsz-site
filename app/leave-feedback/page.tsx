import Breadcrumb from "@/components/Common/Breadcrumb";
import TextSubmissionForm from "@/components/Common/TextSubmissionForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leave Feedback | StorySizer",
  description:
    "Share your StorySizer experience and suggestions to help improve estimation quality and team collaboration.",
  alternates: {
    canonical: "/leave-feedback",
  },
  openGraph: {
    title: "Leave Feedback | StorySizer",
    description:
      "Send product feedback directly to the StorySizer team.",
    url: "/leave-feedback",
    siteName: "StorySizer",
    type: "website",
  },
};

const LeaveFeedbackPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Leave Feedback"
        description="Share what worked, what felt unclear, and what would make StorySizer more useful for your team."
      />
      <TextSubmissionForm
        title="Tell us your experience"
        caption="Your feedback goes directly to the StorySizer team. If you give permission, selected feedback may be published in the Community Feedback section."
        submissionType="feedback"
        submitLabel="Send Feedback"
      />
    </>
  );
};

export default LeaveFeedbackPage;
