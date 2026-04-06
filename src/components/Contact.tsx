import { Mail, MapPin, Phone } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Info */}
          <div>
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Hubungi Kami</span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground text-balance">
              Mari Jalin Silaturahmi
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              Tertarik menjadi bagian dari kegiatan kami, ingin berbagi melalui donasi, atau sekadar ingin tahu lebih banyak tentang Aisyiyah Ngasem? Silakan hubungi kami.
            </p>

            {/* Contact Info */}
            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Alamat</h3>
                  <p className="mt-1 text-muted-foreground">
                    Ngasem, Colomadu, Karanganyar
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Email</h3>
                  <p className="mt-1 text-muted-foreground">
                    aisyiyah.ngasem@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Hubungi Kami</h3>
                  <p className="mt-1 text-muted-foreground">
                    +62 (821) 000 000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
