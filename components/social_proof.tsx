import Image from 'next/image';

export function SocialProof() {
    return (
        <section className="border-y border-neutral-900 bg-neutral-950/30 py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center gap-8 text-center md:flex-row md:justify-between md:text-left">
                    <div className="max-w-md space-y-2">
                        <h3 className="text-lg font-semibold text-white">Trusted by Institutions</h3>
                        <p className="text-sm text-neutral-400">
                            Delivering professional content that builds trust and engagement.
                        </p>
                    </div>

                    <div className="flex items-center gap-6 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm">
                        {/* Placeholder for Logo - In production replace with actual EDISU logo */}
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-xl font-bold text-white">
                            E
                        </div>
                        <div className="text-left">
                            <p className="text-base font-bold text-white">EDISU Piemonte</p>
                            <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                                Official Website Face & <br /> Brand Ambassador
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
