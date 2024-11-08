import { getTelcos } from "@/services/telcoService";
import Calculator from "@/components/Calculator";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import AppNavbar from "@/components/AppNavbar";

export default async function Home() {
  const telcos = await getTelcos();

  return (
    <div className="min-h-screen flex flex-col">
      <AppNavbar />
      <main className="flex-grow">
        <Hero />
        <section id="calculator" className="container mx-auto px-4 py-8">
          <Calculator telcos={telcos} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
