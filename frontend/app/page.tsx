import { readContent } from "@/lib/content";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import WhoWeAre from "@/components/sections/WhoWeAre";
import Recognitions from "@/components/sections/Recognitions";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import ImpactStats from "@/components/sections/ImpactStats";
import JoinUs from "@/components/sections/JoinUs";
import StoriesUpdates from "@/components/sections/StoriesUpdates";

export default async function Home() {
  const content = await readContent();

  return (
    <>
      <Navbar content={content.navbar} />
      <main className="flex flex-col flex-1">
        <Hero content={content.hero} />
        <WhoWeAre content={content.whoWeAre} />
        <Recognitions content={content.recognitions} />
        <FeaturedProjects content={content.featuredProjects} />
        <ImpactStats content={content.impactStats} />
        <JoinUs content={content.joinUs} />
        <StoriesUpdates content={content.storiesUpdates} />
      </main>
      <Footer content={content.footer} />
    </>
  );
}
