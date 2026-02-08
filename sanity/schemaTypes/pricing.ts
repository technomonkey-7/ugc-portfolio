import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'pricing',
    title: 'Pricing Packages',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Package Title',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'string',
            description: 'Short description (e.g., Perfect for testing...)'
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
        }),
        defineField({
            name: 'currency',
            title: 'Currency Symbol',
            type: 'string',
            initialValue: '€'
        }),
        defineField({
            name: 'frequency',
            title: 'Payment Frequency',
            type: 'string',
            description: 'e.g., / video, / month'
        }),
        defineField({
            name: 'features',
            title: 'Features List',
            type: 'array',
            of: [{ type: 'string' }]
        }),
        defineField({
            name: 'isPopular',
            title: 'Mark as Popular (Highlight)',
            type: 'boolean',
            initialValue: false
        }),
        defineField({
            name: 'ctaText',
            title: 'Button Text',
            type: 'string',
            initialValue: 'Get Started'
        }),
        defineField({
            name: 'order',
            title: 'Order',
            type: 'number',
            description: 'Used to sort packages (lower numbers first)'
        })
    ]
})
