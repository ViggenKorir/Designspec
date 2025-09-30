'use client';

import { motion } from 'framer-motion';
import { Users, Award, Clock, TrendingUp } from 'lucide-react';

const stats = [
  {
    icon: Clock,
    value: '14+',
    label: 'Years of Excellence',
    description: 'Serving clients since 2010',
  },
  {
    icon: Users,
    value: '500+',
    label: 'Satisfied Clients',
    description: 'Across Kenya and beyond',
  },
  {
    icon: TrendingUp,
    value: '98%',
    label: 'Success Rate',
    description: 'Projects delivered on time',
  },
  {
    icon: Award,
    value: '50+',
    label: 'Expert Team',
    description: 'Qualified professionals',
  },
];

export function StatsSection() {
  return (
    <section className="bg-primary/5 py-20 sm:py-32">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Trusted by Hundreds
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our track record speaks for itself. Here's what we've achieved together with our clients.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-lg border bg-background p-8 text-center shadow-sm transition-all hover:shadow-md"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-8 w-8" />
                </div>
                <div className="mb-2 text-4xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="mb-2 text-lg font-semibold text-foreground">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>

                {/* Decorative element */}
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 blur-2xl" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
