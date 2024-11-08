import { getTelcos } from "@/services/telcoService";
import Calculator from "@/components/sections/Calculator";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import AppNavbar from "@/components/layout/AppNavbar";
import About from "@/components/sections/About";
import Features from "@/components/sections/Features";
import FAQ from "@/components/sections/FAQ";

export default async function Home() {
  const telcos = await getTelcos();

  return (
    <div className="min-h-screen flex flex-col">
      <AppNavbar />
      <main className="flex-grow">
        <Hero />
        <section id="about" className="py-20">
          <About />
        </section>
        <section id="features" className="py-20 bg-default-50">
          <Features />
        </section>
        <section id="calculator" className="py-20">
          <Calculator telcos={telcos} />
        </section>
        <section id="faq" className="py-20 bg-default-50">
          <FAQ />
        </section>
      </main>
      <Footer />
    </div>
  );
}
