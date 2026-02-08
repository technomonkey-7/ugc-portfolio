'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { client } from '../sanity/lib/client';
import { urlForImage } from '../sanity/lib/image';

interface Profile {
    name: string;
    headline: string;
    bio: string;
    heroImage: any;
    socialLinks: any[];
}

export function Hero() {
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await client.fetch(`*[_type == "profile"][0]`);
                if (data) setProfile(data);
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            }
        }
        fetchProfile();
    }, []);

    const firstName = profile?.name ? profile.name.split(' ')[0] : 'Arda';
    const lastName = profile?.name ? profile.name.split(' ').slice(1).join(' ') : 'Cankaya';
    // Fallbacks
    const headline = profile?.headline || "Computer Engineering Student at Politecnico di Torino.";
    const bio = profile?.bio || "Translating technical precision into high-converting visual stories. I help brands connect with their audience through authentic and engaging user-generated content.";

    return (
        <section className="relative flex min-h-[95vh] w-full flex-col justify-center px-4 md:px-8 lg:px-16 pt-20 md:pt-0">
            {/* Background Effects */}
            <div className="absolute top-[-20%] left-[-10%] h-[700px] w-[700px] rounded-full bg-violet-600/30 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-5%] h-[600px] w-[600px] rounded-full bg-indigo-600/20 blur-[100px] pointer-events-none" />
            <div className="absolute top-[40%] right-[30%] h-[400px] w-[400px] rounded-full bg-fuchsia-600/20 blur-[80px] pointer-events-none" />
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/50 via-black to-black" />

            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

                {/* Left Column: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 order-2 lg:order-1 lg:col-span-7"
                >
                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-violet-200">Available for Work</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9]">
                        {firstName} <br />
                        <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                            {lastName}
                        </span>
                    </h1>

                    {/* Subheadline & Bio */}
                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-medium text-white/90" dangerouslySetInnerHTML={{ __html: headline }} />
                        <p className="text-lg text-neutral-400 leading-relaxed text-pretty">
                            {bio}
                        </p>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
                        <Link
                            href="#contact"
                            className="group flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-black transition-all hover:bg-neutral-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95"
                        >
                            <Sparkles className="h-4 w-4" />
                            Work with me
                        </Link>
                        <Link
                            href="#portfolio"
                            className="flex items-center justify-center gap-2 rounded-full border border-neutral-800 bg-black/50 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-neutral-900 hover:border-neutral-600 active:scale-95"
                        >
                            View Portfolio <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {/* Social Stats/Links could go here */}
                    {profile?.socialLinks && profile.socialLinks.length > 0 && (
                        <div className="flex gap-6 pt-4">
                            {profile.socialLinks.map((link: any) => (
                                <Link
                                    key={link._key}
                                    href={link.url}
                                    target="_blank"
                                    className="text-neutral-500 hover:text-white transition-colors text-sm font-semibold uppercase tracking-widest border-b border-transparent hover:border-violet-500 pb-0.5"
                                >
                                    {link.platform}
                                </Link>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Right Column: Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: 30 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="relative order-1 lg:order-2 flex justify-center lg:justify-end lg:col-span-5"
                >
                    <div className="relative w-[280px] h-[380px] sm:w-[350px] sm:h-[450px] md:w-[400px] md:h-[500px] lg:w-[480px] lg:h-[600px] rotate-3 transition-transform hover:rotate-0 duration-500">
                        {/* Decorative Frames */}
                        <div className="absolute inset-0 rounded-3xl border border-violet-500/20 translate-x-4 translate-y-4" />
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/10 to-indigo-500/5 backdrop-blur-sm -translate-x-4 -translate-y-4" />

                        {/* Main Image Container */}
                        <div className="absolute inset-0 overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-transparent opacity-30 mix-blend-overlay z-10 pointer-events-none" />

                            {profile?.heroImage ? (
                                <img
                                    src={urlForImage(profile.heroImage).width(800).quality(100).url()}
                                    alt={profile.name || "Arda Cankaya"}
                                    className="h-full w-full object-cover object-center"
                                />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center bg-neutral-900 text-neutral-700">
                                    <span className="text-xl">No Image</span>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

            </div>
        </section >
    );
}
