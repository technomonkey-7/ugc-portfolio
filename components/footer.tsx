'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { client } from '../sanity/lib/client';

export function Footer() {
    const [name, setName] = useState("ARDA CANKAYA");
    const [socialLinks, setSocialLinks] = useState<any[]>([]);

    useEffect(() => {
        client.fetch(`*[_type == "profile"][0]{name, socialLinks}`).then(data => {
            if (data) {
                if (data.name) setName(data.name.toUpperCase());
                if (data.socialLinks) setSocialLinks(data.socialLinks);
            }
        }).catch(e => console.error(e));
    }, []);

    return (
        <footer className="border-t border-neutral-900 bg-black py-12">
            <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 text-center md:flex-row md:px-8 md:text-left">
                <div>
                    <p className="text-lg font-bold text-white">{name}</p>
                    <p className="text-sm text-neutral-500">
                        © {new Date().getFullYear()} All rights reserved.
                    </p>
                </div>
                <div className="flex gap-6">
                    {socialLinks.length > 0 ? (
                        socialLinks.map((link: any) => (
                            <Link
                                key={link._key}
                                href={link.url}
                                target="_blank"
                                className="text-neutral-400 hover:text-white transition-colors"
                            >
                                {link.platform}
                            </Link>
                        ))
                    ) : (
                        // Fallback static links if none in CMS
                        <>
                            <Link href="#" className="text-neutral-400 hover:text-white transition-colors">Instagram</Link>
                            <Link href="#" className="text-neutral-400 hover:text-white transition-colors">Email</Link>
                        </>
                    )}
                </div>
            </div>
        </footer>
    );
}
