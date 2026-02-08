import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'profile',
    title: 'Profile',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Full Name',
            type: 'string',
        }),
        defineField({
            name: 'email',
            title: 'Contact Email',
            type: 'string',
            validation: Rule => Rule.email()
        }),
        defineField({
            name: 'headline',
            title: 'Headline',
            type: 'string',
            description: 'e.g., "UGC Creator & Engineer"',
        }),
        defineField({
            name: 'bio',
            title: 'Short Bio',
            type: 'text',
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'platform', type: 'string', title: 'Platform' },
                        { name: 'url', type: 'url', title: 'URL' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'showPricing',
            title: 'Show Pricing Section',
            type: 'boolean',
            description: 'Toggle to hide/show the pricing section on the website.',
            initialValue: true
        }),
        defineField({
            name: 'favicon',
            title: 'Favicon / Browser Icon',
            type: 'image',
            description: 'Upload a small square image (e.g., logo or initials) for the browser tab.',
        }),
    ],
})
