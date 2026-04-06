import { readShared, readHome } from "@/lib/content";

export const revalidate = 3600; // ISR: revalidate every 1 hour
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
  const [shared, home] = await Promise.all([readShared(), readHome()]);

  return (
    <>
      <Navbar content={shared.navbar} />
      <main className="flex flex-col flex-1">
        <Hero content={home.hero} />
        <WhoWeAre content={home.whoWeAre} />
        <Recognitions content={home.recognitions} />
        <FeaturedProjects content={home.featuredProjects} />
        <ImpactStats content={home.impactStats} />
        <JoinUs content={home.joinUs} />
        <StoriesUpdates content={home.storiesUpdates} />
      </main>
      <Footer content={shared.footer} />
    </>
  );
}
