import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About StorySizer | Objective Story Estimation",
  description:
    "Learn how StorySizer improves story point estimation with guided questionnaires, objective parameters, and team-wide consistency.",
  keywords: ["StorySizer", "about", "agile", "story points", "estimation workflow"],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About StorySizer | Objective Story Estimation",
    description:
      "StorySizer helps teams replace gut feeling with a more structured and repeatable estimation process.",
    url: "/about",
    siteName: "StorySizer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About StorySizer | Objective Story Estimation",
    description:
      "Discover the principles behind StorySizer's collaborative story point estimation approach.",
  },
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About Page"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;
