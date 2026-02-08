'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Instagram, UserCheck, Briefcase } from 'lucide-react';
import { ProjectModal } from '@/components/project_modal';
import { client } from '../sanity/lib/client';
import { urlForImage } from '../sanity/lib/image';

interface Partnership {
    _id: string;
    title: string;
    role: string;
    description: string;
    websiteUrl?: string;
    testimonial: string;
    testimonialAuthor: string;
    images: any[];
}

export function EdisuFeature() {
    const [partnerships, setPartnerships] = useState<Partnership[]>([]);
    const [selectedPartnership, setSelectedPartnership] = useState<Partnership | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch ALL partnerships
                const result = await client.fetch(`*[_type == "partnership"] | order(_createdAt asc)`);
                if (result.length > 0) {
                    setPartnerships(result);
                } else {
                    // Fallback to default if absolutely no data exists
                    setPartnerships([{
                        _id: 'default-edisu',
                        title: "EDISU Piemonte",
                        role: "Brand Ambassador",
                        description: "Chosen as the official face of the website and Brand Ambassador for the Regional Agency for the Right to University Study.",
                        testimonial: "Shared on the official Instagram of the President of EDISU Piemonte as a mark of appreciation.",
                        testimonialAuthor: "EDISU President",
                        images: []
                    }]);
                }
            } catch (error) {
                console.error("Failed to fetch partnerships:", error);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <section className="container mx-auto px-4 py-24 md:px-8 space-y-24">
                {partnerships.map((partnership, index) => (
                    <motion.div
                        key={partnership._id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        onClick={() => setSelectedPartnership(partnership)}
                        className="group relative cursor-pointer overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/40 transition-all hover:border-violet-500/50 hover:bg-neutral-900/60"
                    >
                        {/* Hover Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        <div className="grid grid-cols-1 md:grid-cols-2 relative z-10">
                            {/* Text Content */}
                            <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-red-600 to-red-800 font-bold text-white shadow-lg shadow-red-900/20">
                                        {partnership.title.charAt(0)}
                                    </div>
                                    <span className="text-sm font-medium tracking-widest text-violet-300 uppercase">Featured Partnership</span>
                                </div>

                                <div>
                                    <h2 className="text-3xl font-bold text-white md:text-4xl mb-4">{partnership.title}</h2>
                                    <p className="text-lg text-neutral-400 group-hover:text-neutral-300 transition-colors">
                                        {partnership.description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <div className="flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-800/50 px-4 py-1.5 text-xs font-medium text-neutral-300 transition-colors group-hover:border-violet-500/30 group-hover:text-violet-200">
                                        <Briefcase className="h-3 w-3" />
                                        {partnership.role}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-white font-medium group-hover:text-violet-300 transition-colors">
                                    View Details <ArrowUpRight className="h-4 w-4" />
                                </div>
                            </div>

                            {/* Visual Placeholder or Image */}
                            <div className="relative min-h-[300px] bg-neutral-800 md:min-h-full overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 to-transparent z-10 opacity-30 transition-opacity duration-500 group-hover:opacity-100" />

                                {partnership.images && partnership.images.length > 0 ? (
                                    <img
                                        src={urlForImage(partnership.images[0]).width(1000).auto('format').url()}
                                        alt={partnership.title}
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    /* Fallback Placeholder */
                                    <div className="absolute inset-0 flex items-center justify-center text-neutral-500 transition-transform duration-700 group-hover:scale-105">
                                        <p>{partnership.title} Preview</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </section>

            {selectedPartnership && (
                <ProjectModal
                    isOpen={!!selectedPartnership}
                    onClose={() => setSelectedPartnership(null)}
                    title={selectedPartnership.title}
                    description={selectedPartnership.description}
                    websiteUrl={selectedPartnership.websiteUrl}
                    testimonial={{
                        quote: selectedPartnership.testimonial || "Professional collaboration.",
                        author: selectedPartnership.testimonialAuthor || "Partner",
                        role: "Official Recognition"
                    }}
                    images={
                        selectedPartnership.images?.length
                            ? selectedPartnership.images.map((img: any) => urlForImage(img).auto('format').url())
                            : ["/images/placeholder-website.jpg"]
                    }
                />
            )}
        </>
    );
}
