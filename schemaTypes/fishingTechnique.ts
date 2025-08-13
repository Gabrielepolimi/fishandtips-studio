import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'fishingTechnique',
  title: 'Tecnica di Pesca',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nome tecnica',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrizione',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'icon',
      title: 'Icona',
      type: 'string',
      description: 'Emoji o nome icona',
    }),
    defineField({
      name: 'difficulty',
      title: 'Livello di difficoltà',
      type: 'string',
      options: {
        list: [
          {title: 'Facile', value: 'easy'},
          {title: 'Media', value: 'medium'},
          {title: 'Difficile', value: 'hard'},
        ],
      },
    }),
    defineField({
      name: 'seasons',
      title: 'Stagioni consigliate',
      type: 'array',
      of: [{type: 'reference', to: {type: 'season'}}],
    }),
    defineField({
      name: 'environments',
      title: 'Ambienti adatti',
      type: 'array',
      of: [{type: 'reference', to: {type: 'environment'}}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      icon: 'icon',
      difficulty: 'difficulty',
    },
    prepare(selection) {
      const {icon, difficulty} = selection
      const difficultyLabels = {
        easy: 'Facile',
        medium: 'Media',
        hard: 'Difficile',
      }
      return {
        ...selection,
        subtitle: `${icon || '🎣'} • ${difficultyLabels[difficulty] || difficulty}`,
      }
    },
  },
})
