'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    websiteUrl?: string; // Optional website link
    images?: string[]; // Array of image URLs
    testimonial?: {
        quote: string;
        author: string;
        role: string;
    };
}

export function ProjectModal({ isOpen, onClose, title, description, websiteUrl, images, testimonial }: ProjectModalProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Prevent body scroll when modal is open
    // Prevent body scroll when modal is open and compensate for scrollbar width
    useEffect(() => {
        if (isOpen || selectedImage) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
        };
    }, [isOpen, selectedImage]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        key="modal-content"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
                        onClick={onClose} // Close when clicking outside
                    >
                        <div
                            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-neutral-800 bg-neutral-900 shadow-2xl scrollbar-hide"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                        >

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute right-4 top-4 z-10 rounded-full bg-neutral-800 p-2 text-white transition-colors hover:bg-neutral-700"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2">
                                {/* Left: Content */}
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
                                        <div className="h-1 w-20 bg-white rounded-full mb-4"></div>
                                        <p className="text-neutral-400 leading-relaxed max-w-prose">{description}</p>

                                        {websiteUrl && (
                                            <a
                                                href={websiteUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
                                            >
                                                Visit Official Website <Maximize2 className="h-3 w-3" />
                                            </a>
                                        )}
                                    </div>

                                    {testimonial && (
                                        <div className="rounded-xl bg-white/5 p-6 border border-white/10">
                                            <p className="italic text-neutral-300 mb-4">"{testimonial.quote}"</p>
                                            <div>
                                                <p className="font-bold text-white">{testimonial.author}</p>
                                                <p className="text-xs text-neutral-500 uppercase tracking-widest">{testimonial.role}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Right: Images */}
                                <div className="space-y-4">
                                    {images && images.length > 0 ? (
                                        images.map((img, idx) => (
                                            <div
                                                key={idx}
                                                className="group relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-800 border border-neutral-700 cursor-pointer"
                                                onClick={() => setSelectedImage(img)}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`${title} - Gallery ${idx + 1}`}
                                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                {/* Zoom Overlay */}
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                                    <Maximize2 className="h-8 w-8 text-white drop-shadow-lg" />
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                                            <p className="text-neutral-500">No images available</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}

            {/* Lightbox / Zoom View */}
            {selectedImage && (
                <motion.div
                    key="lightbox"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute right-4 top-4 z-50 rounded-full bg-neutral-800/50 p-2 text-white transition-colors hover:bg-neutral-700"
                    >
                        <X className="h-6 w-6" />
                    </button>

                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        className="relative z-[90] flex items-center justify-center p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImage}
                            alt="Zoomed Review"
                            className="max-h-[85vh] max-w-[85vw] object-contain rounded-lg shadow-2xl"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
