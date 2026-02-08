'use client';

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import Image from 'next/image'
import { client } from '../sanity/lib/client'
import { urlForImage } from '../sanity/lib/image'

interface Project {
    _id: string
    title: string
    category: string
    videoUrl: string
    videoFileUrl?: string
    thumbnail: any
    metrics?: string
}

export function PortfolioGrid() {
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const query = `*[_type == "project"] | order(_createdAt desc) {
                    ...,
                    "videoFileUrl": videoFile.asset->url
                }`
                const data = await client.fetch(query)
                setProjects(data)
            } catch (error) {
                console.error("Failed to fetch projects:", error)
            }
        }

        fetchProjects()
    }, [])

    if (projects.length === 0) {
        return (
            <section id="portfolio" className="container mx-auto px-4 py-24 md:px-8">
                <div className="text-center text-neutral-500">
                    <p>Loading projects...</p>
                    {/* Fallback for when no content is in Sanity yet */}
                    <p className="text-xs mt-2 opacity-50">(If you are the admin, add projects in /studio)</p>
                </div>
            </section>
        )
    }

    return (
        <section id="portfolio" className="container mx-auto px-4 py-24 md:px-8 relative overflow-hidden">
            {/* Ambient Background - Subtle Opacity (15%) & Z-Index 0 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-violet-800/15 blur-[120px] pointer-events-none" />

            <div className="mb-12 space-y-4 text-center relative z-10">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Selected Works</h2>
                <p className="mx-auto max-w-2xl text-neutral-400">
                    High-performing creative strategies for brands.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
                {projects.map((project, index) => (
                    <motion.div
                        key={project._id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group relative w-full md:max-w-[calc(50%-1.5rem)] lg:max-w-[calc(33.333%-1.5rem)] min-w-[300px] aspect-[9/16] cursor-pointer overflow-hidden rounded-xl bg-neutral-900"
                        onClick={() => {
                            const url = project.videoFileUrl || project.videoUrl;
                            if (url) window.open(url, '_blank');
                        }}
                    >
                        {project.thumbnail && (
                            <Image
                                src={urlForImage(project.thumbnail).width(600).height(1066).fit('crop').auto('format').quality(85).url()}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        )}

                        <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/40" />

                        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                                <Play className="h-6 w-6 fill-white text-white" />
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                            <div className="transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                                <span className="mb-2 inline-block rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                                    {project.category}
                                </span>
                                <h3 className="text-lg font-bold text-white text-shadow-sm">{project.title}</h3>
                                {project.metrics && (
                                    <p className="mt-1 text-sm font-medium text-green-400">{project.metrics}</p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
