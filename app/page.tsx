import { Hero, Marquee, About, Services, Work, Experience, StackSection, Contact, EngineeringNotes } from "@/components/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Work />
      <EngineeringNotes />
      <Experience />
      <StackSection />
      <Contact />
    </>
  );
}
