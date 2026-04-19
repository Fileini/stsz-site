import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact StorySizer | Support and Help",
  description:
    "Need help with StorySizer? Contact support to report issues, ask questions, or request assistance.",
  keywords: ["StorySizer support", "contact", "help", "bug report", "support ticket"],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact StorySizer | Support and Help",
    description:
      "Open a support request and get direct assistance from the StorySizer team.",
    url: "/contact",
    siteName: "StorySizer",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact StorySizer | Support and Help",
    description: "Get support and send your request directly to the StorySizer team.",
  },
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Help Page"
        description="Isuues with the app? Need help? Contact us and we will get back to you."
      />

      <Contact />
    </>
  );
};

export default ContactPage;
