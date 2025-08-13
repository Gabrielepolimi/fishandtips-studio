import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().max(60).warning('Il titolo dovrebbe essere inferiore a 60 caratteri per SEO')
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Breve descrizione dell\'articolo (max 160 caratteri per SEO)',
      validation: Rule => Rule.max(160).warning('L\'excerpt dovrebbe essere inferiore a 160 caratteri per SEO')
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
      validation: Rule => Rule.min(1).max(3)
    }),
    defineField({
      name: 'fishingTechniques',
      title: 'Tecniche di Pesca',
      type: 'array',
      of: [{type: 'reference', to: {type: 'fishingTechnique'}}],
      description: 'Seleziona le tecniche di pesca trattate in questo articolo',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      validation: Rule => Rule.required()
    }),
    // SEO Fields
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Titolo personalizzato per SEO (se vuoto usa il titolo principale)',
      validation: Rule => Rule.max(60).warning('Il titolo SEO dovrebbe essere inferiore a 60 caratteri')
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Descrizione personalizzata per SEO (se vuota usa l\'excerpt)',
      validation: Rule => Rule.max(160).warning('La descrizione SEO dovrebbe essere inferiore a 160 caratteri')
    }),
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Parole chiave per SEO (separate da virgole)',
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'seoImage',
      title: 'SEO Image',
      type: 'image',
      description: 'Immagine personalizzata per social media (se vuota usa mainImage)',
      options: {
        hotspot: true,
      }
    }),
    defineField({
      name: 'readingTime',
      title: 'Tempo di Lettura',
      type: 'number',
      description: 'Tempo di lettura stimato in minuti',
      validation: Rule => Rule.min(1).max(60)
    }),
    defineField({
      name: 'featured',
      title: 'Articolo in Evidenza',
      type: 'boolean',
      description: 'Mostra questo articolo in evidenza nella homepage',
      initialValue: false
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Bozza', value: 'draft'},
          {title: 'Pubblicato', value: 'published'},
          {title: 'Archiviato', value: 'archived'}
        ]
      },
      initialValue: 'draft',
      validation: Rule => Rule.required()
    })
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      status: 'status'
    },
    prepare(selection) {
      const {author, status} = selection
      return {
        ...selection, 
        subtitle: `${author && `by ${author}`} ${status && `(${status})`}`
      }
    },
  },
})
