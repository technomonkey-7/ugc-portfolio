# Arda Cankaya | UGC Portfolio

A modern, high-performance portfolio website built with **Next.js 14**, **Tailwind CSS**, **Framer Motion**, and **Sanity.io**.

## Features

- ⚡ **Dynamic Content:** Projects, profile details, and pricing are managed via Sanity CMS.
- 🎨 **Premium UI:** Smooth animations, glassmorphism effects, and responsive design.
- 📱 **Mobile First:** Fully optimized for all device sizes.
- 🔍 **SEO Optimized:** Dynamic metadata and OpenGraph tags.

## Vercel Deployment Guide

1.  **Push to GitHub:**
    Commit your changes and push to a GitHub repository.

2.  **Import to Vercel:**
    - Go to [Vercel Dashboard](https://vercel.com/dashboard).
    - Click **"Add New..."** > **"Project"**.
    - Import your GitHub repository.

3.  **Environment Variables:**
    **CRITICAL:** You must add the following environment variables in Vercel (Settings > Environment Variables) for the CMS to work:

    ```bash
    NEXT_PUBLIC_SANITY_PROJECT_ID=YourProjectID
    NEXT_PUBLIC_SANITY_DATASET=production
    ```
    *(You can find these in your local `.env.local` file)*

4.  **Deploy:**
    Click "Deploy" and wait for the build to complete.

## Sanity Studio

To access the admin panel (CMS), go to `/studio` (e.g., `your-site.vercel.app/studio`) after deployment.

