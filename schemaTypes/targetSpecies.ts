import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'targetSpecies',
  title: 'Specie Target',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nome specie',
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
      name: 'scientificName',
      title: 'Nome scientifico',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descrizione',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Immagine',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'habitat',
      title: 'Habitat',
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
      name: 'environments',
      title: 'Ambienti',
      type: 'array',
      of: [{type: 'reference', to: {type: 'environment'}}],
    }),
    defineField({
      name: 'bestTechniques',
      title: 'Tecniche migliori',
      type: 'array',
      of: [{type: 'reference', to: {type: 'fishingTechnique'}}],
    }),
    defineField({
      name: 'size',
      title: 'Taglia media',
      type: 'string',
      options: {
        list: [
          {title: 'Piccola (< 20cm)', value: 'small'},
          {title: 'Media (20-50cm)', value: 'medium'},
          {title: 'Grande (50-100cm)', value: 'large'},
          {title: 'Molto grande (> 100cm)', value: 'xlarge'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      scientificName: 'scientificName',
      habitat: 'habitat',
      image: 'image',
    },
    prepare(selection) {
      const {scientificName, habitat} = selection
      const habitatLabels = {
        freshwater: 'Acqua dolce',
        saltwater: 'Acqua salata',
        brackish: 'Acqua salmastra',
      }
      return {
        ...selection,
        subtitle: `${scientificName ? `(${scientificName})` : ''} • ${habitatLabels[habitat] || habitat}`,
      }
    },
  },
})
