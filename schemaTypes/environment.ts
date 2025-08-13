import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'environment',
  title: 'Ambiente di Pesca',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nome ambiente',
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
      name: 'type',
      title: 'Tipo di acqua',
      type: 'string',
      options: {
        list: [
          {title: 'Acqua dolce', value: 'freshwater'},
          {title: 'Acqua salata', value: 'saltwater'},
          {title: 'Acqua salmastra', value: 'brackish'},
        ],
      },
    }),
    defineField({
      name: 'seasons',
      title: 'Stagioni migliori',
      type: 'array',
      of: [{type: 'reference', to: {type: 'season'}}],
    }),
    defineField({
      name: 'bestTechniques',
      title: 'Tecniche consigliate',
      type: 'array',
      of: [{type: 'reference', to: {type: 'fishingTechnique'}}],
    }),
    defineField({
      name: 'commonSpecies',
      title: 'Specie comuni',
      type: 'array',
      of: [{type: 'reference', to: {type: 'targetSpecies'}}],
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
  ],
  preview: {
    select: {
      title: 'title',
      icon: 'icon',
      type: 'type',
      difficulty: 'difficulty',
    },
    prepare(selection) {
      const {icon, type, difficulty} = selection
      const typeLabels = {
        freshwater: 'Acqua dolce',
        saltwater: 'Acqua salata',
        brackish: 'Acqua salmastra',
      }
      const difficultyLabels = {
        easy: 'Facile',
        medium: 'Media',
        hard: 'Difficile',
      }
      return {
        ...selection,
        subtitle: `${icon || '📍'} • ${typeLabels[type] || type} • ${difficultyLabels[difficulty] || difficulty}`,
      }
    },
  },
})
