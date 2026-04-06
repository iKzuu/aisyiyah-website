import { Target, Eye } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="relative py-20 md:py-32">

      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-size-[4rem_4rem]" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/5 blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Tentang Kami</span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground text-balance">
            Berkhidmat untuk Umat dan Bangsa
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
            Aisyiyah adalah organisasi perempuan dari Persyarikatan Muhammadiyah yang merupakan gerakan islam berupa dakwah untuk mendorong kebaikan dan melarang kemungkaran, didasarkan pada ajaran Islam serta berlandaskan Al-Qur'an dan As-Sunnah.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="group p-8 rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Misi</h3>
            <p className="text-muted-foreground leading-relaxed">
              Menegakkan keyakinan tauhid murni sesuai ajaran Islam, serta meningkatkan harkat dan martabat perempuan melalui pendidikan dan pemberdayaan ekonomi.
            </p>
          </div>

          {/* Vision */}
          <div className="group p-8 rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
              <Eye className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Visi</h3>
            <p className="text-muted-foreground leading-relaxed">
              Tegaknya agama Islam dan terwujudnya masyarakat Islam yang sebenar-benarnya melalui gerakan perempuan yang berkemajuan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
