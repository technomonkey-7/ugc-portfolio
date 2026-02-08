import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'UGC Video', value: 'ugc' },
                    { title: 'Brand Ambassadorship', value: 'ambassador' },
                    { title: 'Viral Trend', value: 'viral' },
                    { title: 'Other', value: 'other' },
                ],
            },
        }),
        defineField({
            name: 'videoUrl',
            title: 'Video URL',
            type: 'url',
            description: 'Link to the video (TikTok/Instagram/YouTube). Use this OR the Video File below.',
        }),
        defineField({
            name: 'videoFile',
            title: 'Video File',
            type: 'file',
            options: {
                accept: 'video/*'
            },
            description: 'Upload a video file directly (for samples without a URL).',
        }),
        defineField({
            name: 'thumbnail',
            title: 'Thumbnail Image',
            type: 'image',
            options: {
                hotspot: true, // Enables the cropping UI
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                }
            ]
        }),
        defineField({
            name: 'metrics',
            title: 'Key Metrics',
            type: 'string',
            description: 'e.g., "1.2M Views", "+20% Sales"',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'category',
            media: 'thumbnail',
        },
    },
})
