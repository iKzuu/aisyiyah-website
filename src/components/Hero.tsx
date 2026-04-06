import Image from "next/image";
import BounceCard from "./ui/BounceCard";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">

      <div className="absolute inset-0 -z-10">
        <Image 
          src="/images/picture_3.jpeg"
          alt="Hero Background"
          width={1200}
          height={800}
          className="hidden xl:block w-full h-full object-cover"
        />

        <Image 
          src="/images/picture_3.jpeg"
          alt="Hero Background"
          width={800}
          height={1200}
          className="block xl:hidden w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-primary-foreground text-primary text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Aisyiyah Ranting Desa Ngasem
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-primary-foreground leading-tight tracking-tight text-balance">
            Mewujudkan Kehidupan Perempuan yang Berkemajuan
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl mx-auto text-pretty leading-relaxed">
            Berkomitmen memberdayakan masyarakat melalui pendidikan, kesehatan, dan aksi sosial berbasis nilai-nilai Islam berkemajuan untuk menciptakan khairu ummah.
          </p>

          <div className="hidden md:block">
            <BounceCard />
          </div>
        </div>
      </div>
    </section>
  );
}
