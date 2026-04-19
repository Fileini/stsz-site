import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "StorySizer | Collective Story Point Estimation Tool",
  description:
    "StorySizer helps agile teams estimate user stories with structured questionnaires, objective parameters, and collaborative alignment.",
  keywords: [
    "StorySizer",
    "story point estimation",
    "agile estimation",
    "scrum planning",
    "team alignment",
    "user story estimation",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "StorySizer | Collective Story Point Estimation Tool",
    description:
      "Estimate stories with confidence using structured and collaborative inputs instead of guesswork.",
    url: "/",
    siteName: "StorySizer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StorySizer | Collective Story Point Estimation Tool",
    description:
      "A smarter way to estimate story points with objective criteria and team alignment.",
  },
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <AboutSectionOne />
      <Testimonials />
      <Contact />
    </>
  );
}
