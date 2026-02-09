'use client';

import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { client } from '../sanity/lib/client';

interface PricingPackage {
    _id: string;
    title: string;
    description: string;
    price: number;
    currency: string;
    frequency: string;
    features: string[];
    isPopular: boolean;
    ctaText: string;
}

export function Pricing() {
    const [packages, setPackages] = useState<PricingPackage[]>([]);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch profile settings and pricing packages in parallel
                const [profileParams, pricingData] = await Promise.all([
                    client.fetch(`*[_type == "profile"][0]{showPricing}`),
                    client.fetch(`*[_type == "pricing"] | order(order asc)`)
                ]);

                // Set Visibility (default to true if undefined to avoid accidental hiding)
                setIsVisible(profileParams?.showPricing !== false);

                if (pricingData.length > 0) {
                    setPackages(pricingData);
                } else {
                    // Fallback defaults
                    setPackages([
                        {
                            _id: 'default-1',
                            title: 'Starter Package',
                            description: 'Perfect for testing new creatives.',
                            price: 150,
                            currency: '€',
                            frequency: '/ video',
                            features: ['1 UGC Video (15-30s)', 'Scriptwriting & Hook Research', '1 Revision Round', 'Raw Footage Included', '3-Day Delivery'],
                            isPopular: false,
                            ctaText: 'Get Started'
                        },
                        {
                            _id: 'default-2',
                            title: 'Monthly Retainer',
                            description: 'Consistent growth for serious brands.',
                            price: 500,
                            currency: '€',
                            frequency: '/ month',
                            features: ['4 UGC Videos per month', 'Monthly Strategy Call', 'Unlimited Revisions', 'A/B Testing Hooks', 'Priority Delivery', 'Usage Rights Included'],
                            isPopular: true,
                            ctaText: 'Available Now'
                        }
                    ]);
                }
            } catch (error) {
                console.error("Failed to fetch pricing data:", error);
            }
        };
        fetchData();
    }, []);

    if (!isVisible) return null;

    return (
        <section id="pricing" className="container mx-auto px-4 py-24 md:px-8 relative">
            {/* Ambient Background - Increased Visibility */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none" />

            <div className="mb-12 space-y-4 text-center relative z-10">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Pricing Plans</h2>
                <p className="mx-auto max-w-2xl text-neutral-400">
                    Professional UGC content tailored to scale your brand's presence.
                </p>
                {packages.length === 0 && (
                    <p className="text-xs text-neutral-600">(Add packages in Sanity Studio)</p>
                )}
            </div>

            {/* Flex Container for perfectly centered adaptable layout */}
            <div className="flex flex-wrap justify-center gap-8 lg:px-4">
                {packages.map((pkg, index) => (
                    <motion.div
                        key={pkg._id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                        className={cn(
                            "group relative flex flex-col rounded-2xl p-8 transition-all w-full md:max-w-[calc(50%-1rem)] lg:max-w-[calc(33.333%-2rem)] sm:min-w-[300px]",
                            pkg.isPopular
                                ? "border border-neutral-700 bg-neutral-900 shadow-2xl shadow-black/50"
                                : "border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm hover:bg-neutral-900/80 hover:border-violet-500/30"
                        )}
                    >
                        {/* Background Effects */}
                        {pkg.isPopular ? (
                            <div className="absolute inset-[-2px] -z-10 rounded-[18px] bg-gradient-to-b from-violet-500 to-indigo-500 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-40" />
                        ) : (
                            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-violet-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-2xl" />
                        )}

                        {/* Popular Badge */}
                        {pkg.isPopular && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-1 text-xs font-bold text-white uppercase tracking-wider shadow-lg shadow-violet-500/20">
                                Most Popular
                            </div>
                        )}

                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-white">{pkg.title}</h3>
                            <p className="text-sm text-neutral-400">{pkg.description}</p>
                        </div>
                        <div className="mb-6">
                            <span className="text-4xl font-bold text-white">{pkg.currency}{pkg.price}</span>
                            <span className="text-neutral-500"> {pkg.frequency}</span>
                        </div>
                        <ul className="mb-8 flex-1 space-y-4">
                            {pkg.features && pkg.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-neutral-300">
                                    <div className={cn("rounded-full p-1", pkg.isPopular ? "bg-violet-500/20" : "")}>
                                        <Check className={cn("h-3 w-3", pkg.isPopular ? "text-violet-300" : "text-violet-400 h-5 w-5")} />
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <button className={cn(
                            "w-full rounded-lg py-3 text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98]",
                            pkg.isPopular
                                ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:bg-opacity-90"
                                : "border border-neutral-700 bg-transparent text-white hover:bg-neutral-800 hover:border-neutral-600 group-hover:border-violet-500/50"
                        )}>
                            {pkg.ctaText}
                        </button>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
