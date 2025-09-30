'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/config/constants';

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-primary-600/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-primary-700/20 blur-3xl" />
      </div>

      <div className="container relative px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-sm text-primary-foreground backdrop-blur-sm"
          >
            <span className="font-semibold">Ready to Get Started?</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl md:text-5xl"
          >
            Let's Bring Your Vision to Life
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10 text-lg text-primary-foreground/90 sm:text-xl"
          >
            Schedule a free consultation with our experts and discover how we can
            transform your ideas into exceptional results.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href={ROUTES.CONTACT}>
              <Button
                size="lg"
                variant="secondary"
                className="group w-full sm:w-auto"
              >
                Book Free Consultation
                <Calendar className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href={ROUTES.CONTACT}>
              <Button
                size="lg"
                variant="outline"
                className="group w-full border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto"
              >
                Request a Quote
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8"
          >
            <div className="flex items-center gap-2 text-primary-foreground/90">
              <MessageSquare className="h-5 w-5" />
              <span className="text-sm">Free Consultation</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-primary-foreground/20" />
            <div className="flex items-center gap-2 text-primary-foreground/90">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm">No Obligation</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-primary-foreground/20" />
            <div className="flex items-center gap-2 text-primary-foreground/90">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm">Quick Response</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
