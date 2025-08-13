import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nome tag',
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
      rows: 2,
    }),
    defineField({
      name: 'color',
      title: 'Colore',
      type: 'string',
      options: {
        list: [
          {title: 'Blu', value: 'blue'},
          {title: 'Verde', value: 'green'},
          {title: 'Rosso', value: 'red'},
          {title: 'Giallo', value: 'yellow'},
          {title: 'Viola', value: 'purple'},
          {title: 'Arancione', value: 'orange'},
          {title: 'Grigio', value: 'gray'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      color: 'color',
    },
    prepare(selection) {
      const {color} = selection
      return {
        ...selection,
        subtitle: `Tag • ${color || 'Nessun colore'}`,
      }
    },
  },
})
