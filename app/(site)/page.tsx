import { Hero } from "@/components/hero";
import { EdisuFeature } from "@/components/edisu_feature";
import { PortfolioGrid } from "@/components/portfolio_grid";
import { Pricing } from "@/components/pricing";
import { client } from "@/sanity/lib/client";

export default async function Home() {
    // Fetch profile data for dynamic contact email
    const profile = await client.fetch(`*[_type == "profile"][0]{email}`);
    const contactEmail = profile?.email || "hello@ardacankaya.com";

    return (
        <div className="flex flex-col gap-4 bg-black selection:bg-white selection:text-black">
            <Hero />
            <EdisuFeature />
            <PortfolioGrid />
            <Pricing />

            {/* Contact Section */}
            <section id="contact" className="container mx-auto px-4 py-32 text-center">
                <div className="mx-auto max-w-2xl space-y-8 rounded-3xl border border-neutral-800 bg-neutral-900/30 p-12 backdrop-blur-sm transition-all hover:border-neutral-700">
                    <h2 className="text-3xl font-bold text-white md:text-4xl">Ready to elevate your brand?</h2>
                    <p className="text-neutral-400">
                        Let's create content that stops the scroll and drives conversions.
                    </p>
                    <a
                        href={`mailto:${contactEmail}`}
                        className="inline-block rounded-full bg-white px-8 py-4 text-lg font-bold text-black transition-all hover:scale-105 hover:bg-neutral-200"
                    >
                        Get in Touch
                    </a>
                </div>
            </section>
        </div>
    );
}
