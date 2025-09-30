"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_MOTTO } from "@/config/constants";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-background py-20 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2">
          <div className="h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
        </div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center rounded-full border bg-background px-4 py-2 text-sm"
          >
            <span className="text-primary font-semibold">
              Trusted Since 2010
            </span>
            <span className="mx-2 text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              Excellence in Design & Consulting
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Transform Your Vision Into{" "}
            <span className="text-primary">Reality</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4 text-lg text-muted-foreground sm:text-xl md:text-2xl"
          >
            {APP_MOTTO}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-10 text-base text-muted-foreground sm:text-lg"
          >
            Expert architectural design, interior design, urban planning, and
            project management services tailored to exceed your expectations.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/contact">
              <Button size="lg" className="group w-full sm:w-auto">
                Request a Quote
                <FileText className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="group w-full sm:w-auto"
              >
                Book Consultation
                <Calendar className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4"
          >
            <div className="flex flex-col items-center">
              <div className="mb-2 text-3xl font-bold text-primary">14+</div>
              <div className="text-sm text-muted-foreground">
                Years Experience
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-2 text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">
                Projects Completed
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-2 text-3xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">
                Client Satisfaction
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-2 text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Expert Team</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <span className="mb-2 text-xs text-muted-foreground">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight className="h-5 w-5 rotate-90 text-muted-foreground" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
