import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'season',
  title: 'Stagione',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nome stagione',
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
      name: 'startMonth',
      title: 'Mese di inizio',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(12),
    }),
    defineField({
      name: 'endMonth',
      title: 'Mese di fine',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(12),
    }),
    defineField({
      name: 'bestTechniques',
      title: 'Tecniche migliori',
      type: 'array',
      of: [{type: 'reference', to: {type: 'fishingTechnique'}}],
    }),
    defineField({
      name: 'bestSpecies',
      title: 'Specie migliori',
      type: 'array',
      of: [{type: 'reference', to: {type: 'targetSpecies'}}],
    }),
    defineField({
      name: 'bestEnvironments',
      title: 'Ambienti migliori',
      type: 'array',
      of: [{type: 'reference', to: {type: 'environment'}}],
    }),
    defineField({
      name: 'weatherConditions',
      title: 'Condizioni meteo ideali',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      icon: 'icon',
      startMonth: 'startMonth',
      endMonth: 'endMonth',
    },
    prepare(selection) {
      const {icon, startMonth, endMonth} = selection
      const months = [
        'Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu',
        'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'
      ]
      const period = startMonth && endMonth 
        ? `${months[startMonth - 1]} - ${months[endMonth - 1]}`
        : ''
      return {
        ...selection,
        subtitle: `${icon || '🍂'} • ${period}`,
      }
    },
  },
})
