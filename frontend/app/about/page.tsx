import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { readContent } from "@/lib/content";
import AboutHero from "@/components/sections/about/AboutHero";
import VisionMissionValues from "@/components/sections/about/VisionMissionValues";
import WhyYouth from "@/components/sections/about/WhyYouth";
import Recognition from "@/components/sections/about/Recognition";
import SharedLeadershipBlock from "@/components/sections/about/SharedLeadershipBlock";

export const metadata = {
  title: "About Us | Sarthi NGO",
  description:
    "Learn about Sarthi's mission, youth-first approach, values, and recognition.",
};

export default function AboutPage() {
  const content = readContent();

  return (
    <>
      <Navbar content={content.navbar} />
      <main className="flex flex-1 flex-col">
        <AboutHero />
        <VisionMissionValues />
        <WhyYouth />
        <Recognition />
        <SharedLeadershipBlock />
      </main>
      <Footer content={content.footer} />
    </>
  );
}
