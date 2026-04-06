import { SiFacebook, SiInstagram } from 'react-icons/si';
import Image from 'next/image';
import Link from 'next/link';

const footerLinks = {
  menu: [
    { label: 'Beranda', href: '#' },
    { label: 'Tentang Kami', href: '#about' },
    { label: 'Blog', href: '#blog' },
    { label: 'Kontak', href: '#contact' },
  ],
  social: [
    { label: 'Instagram', href: '#' },
    { label: 'Facebook', href: '#' },
  ],
  contact: [
    { label: 'Desa Ngasem, Kec. Colomadu, Kab. Karanganyar', href: 'https://maps.app.goo.gl/Cv2uYGAV3dc6fYj69' },
    { label: 'aisyiyah.ngasem@gmail.com', href: '#' },
    { label: '+62 821 000 000', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <Image src="/logo-light.png" width={250} height={250} alt="logo aisyiyah"/>
              </div>
              <span className="font-serif text-xl font-semibold">Aisyiyah Ngasem</span>
            </Link>
            <p className="mt-4 text-sm text-background/70 leading-relaxed">
              Beramal Ilmiah, Berilmu Amaliah.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Menu</h3>
            <ul className="space-y-3">
              {footerLinks.menu.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-background/70 hover:text-background transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Media Sosial</h3>
            <ul className="space-y-3">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-background/70 hover:text-background transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Hubungi Kami</h3>
            <ul className="space-y-3">
              {footerLinks.contact.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-background/70 hover:text-background transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/60">
            &copy; {new Date().getFullYear()} Aisyiyah Ngasem. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-background/60 hover:text-background transition-colors" aria-label="Facebook">
              <SiFacebook size={32}/>
            </Link>
            <Link href="#" className="text-background/60 hover:text-background transition-colors" aria-label="Instagram">
              <SiInstagram size={32}/>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
