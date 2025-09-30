"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Sofa, Map, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/config/constants";

// Mock portfolio data - will be replaced with real data from Supabase
const portfolioItems = [
  {
    id: "1",
    title: "Modern Corporate Headquarters",
    description: "A 15-story sustainable office building in Nairobi CBD",
    service_type: "architectural_design",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    location: "Nairobi CBD",
  },
  {
    id: "2",
    title: "Luxury Residential Interior",
    description: "Contemporary living space with African influences",
    service_type: "interior_design",
    image:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
    location: "Karen, Nairobi",
  },
  {
    id: "3",
    title: "Tatu City Master Plan",
    description: "Urban planning for a mixed-use development",
    service_type: "urban_planning",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
    location: "Kiambu County",
  },
  {
    id: "4",
    title: "Commercial Complex Development",
    description: "End-to-end project management for retail and office space",
    service_type: "project_management",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    location: "Westlands, Nairobi",
  },
];

const serviceTypeLabels: Record<string, string> = {
  architectural_design: "Architecture",
  interior_design: "Interior",
  urban_planning: "Urban Planning",
  project_management: "Project Management",
};

const serviceTypeIcons: Record<string, React.ElementType> = {
  architectural_design: Building2,
  interior_design: Sofa,
  urban_planning: Map,
  project_management: ClipboardCheck,
};

export function PortfolioPreview() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Featured Projects
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore our portfolio of successful projects across various
              sectors
            </p>
          </motion.div>
        </div>

        {/* Portfolio Grid */}
        <div className="mx-auto mt-16 grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {portfolioItems.map((item, index) => {
            const Icon = serviceTypeIcons[item.service_type];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <Badge className="flex items-center gap-1 bg-background/90 text-foreground backdrop-blur-sm">
                      <Icon className="h-3 w-3" />
                      {serviceTypeLabels[item.service_type]}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="mb-3 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      📍 {item.location}
                    </span>
                    <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link href={ROUTES.PORTFOLIO}>
            <Button size="lg" className="group">
              View Full Portfolio
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
