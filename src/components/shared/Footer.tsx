'use client';

import Link from 'next/link';
import { Building2, Mail, Phone, MapPin } from 'lucide-react';
import { APP_NAME, APP_MOTTO, COMPANY_ESTABLISHED, ROUTES, CONTACT_INFO } from '@/config/constants';

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: ROUTES.SERVICES },
    { name: 'Portfolio', href: ROUTES.PORTFOLIO },
    { name: 'Contact', href: ROUTES.CONTACT },
  ],
  services: [
    { name: 'Architectural Design', href: `${ROUTES.SERVICES}#architectural` },
    { name: 'Interior Design', href: `${ROUTES.SERVICES}#interior` },
    { name: 'Urban Planning', href: `${ROUTES.SERVICES}#urban` },
    { name: 'Project Management', href: `${ROUTES.SERVICES}#project` },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Building2 className="h-6 w-6" />
              </div>
              <span className="font-bold text-lg">{APP_NAME}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {APP_MOTTO}
            </p>
            <p className="text-sm text-muted-foreground">
              Established {COMPANY_ESTABLISHED}
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Mail className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {CONTACT_INFO.address}
                </span>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-xs text-muted-foreground">
                {CONTACT_INFO.workingHours}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {APP_NAME}. All rights reserved.
            </p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
