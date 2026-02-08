import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'partnership',
    title: 'Partnership',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Partnership Title',
            type: 'string',
        }),
        defineField({
            name: 'role',
            title: 'Role / Position',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'websiteUrl',
            title: 'Website URL',
            type: 'url',
            description: 'Link to the partner\'s official website (e.g., https://www.edisu.piemonte.it)',
        }),
        defineField({
            name: 'testimonial',
            title: 'Testimonial Quote',
            type: 'text',
        }),
        defineField({
            name: 'testimonialAuthor',
            title: 'Testimonial Author',
            type: 'string',
        }),
        defineField({
            name: 'images',
            title: 'Gallery Images',
            type: 'array',
            of: [{
                type: 'image',
                options: { hotspot: true }
            }],
        }),
    ],
})
