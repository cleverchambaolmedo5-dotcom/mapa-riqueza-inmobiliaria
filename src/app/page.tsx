import { CountdownBar } from "@/components/countdown/CountdownBar";
import { Hero } from "@/components/hero/Hero";
import { Footer } from "@/components/layout/Footer";
import { AuthoritySection } from "@/components/sections/AuthoritySection";
import { LearningSection } from "@/components/sections/LearningSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <CountdownBar />
        <Hero />
        <LearningSection />
        <AuthoritySection />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
}
