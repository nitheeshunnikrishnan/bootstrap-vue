import { mergeData } from 'vue-functional-data-merge'

const CLASS_NAME = 'contributors-container'
const CONTRIBUTOR_CLASS_NAME = 'contributor'

export default {
  name: 'BVDContributorsContainer',
  functional: true,
  props: {
    type: {
      type: String,
      required: true
    },
    contributors: {
      type: Array,
      default: () => []
    },
    showName: {
      type: Boolean,
      default: true
    }
  },
  render(h, { props, data }) {
    const { type, contributors, showName } = props

    if (contributors.length === 0) {
      return h()
    }

    const renderContributor = contributor => {
      const { name, slug, imageUrl, website } = contributor

      const $image = h('b-img-lazy', {
        props: {
          src: imageUrl,
          fluid: true,
          block: true,
          alt: 'Contributor image'
        }
      })

      const $thumbnail = h(
        'div',
        {
          staticClass: `${CONTRIBUTOR_CLASS_NAME}-thumbnail`,
          class: [
            'img-thumbnail',
            'd-flex',
            'flex-wrap',
            'align-items-center',
            'justify-content-center',
            'overflow-hidden'
          ]
        },
        [$image]
      )

      let $name = h()
      if (showName) {
        $name = h(
          'div',
          {
            staticClass: `${CONTRIBUTOR_CLASS_NAME}-name`,
            class: ['small', 'mb-0 ', 'pt-2', 'text-break']
          },
          [name]
        )
      }

      // When contributor has a website, wrap the content in a link
      let $content = [$thumbnail, $name]
      if (website) {
        $content = h(
          'b-link',
          {
            class: ['text-reset'],
            props: { href: website, target: '_blank' }
          },
          [$content]
        )
      }

      return h(
        'div',
        {
          staticClass: CONTRIBUTOR_CLASS_NAME,
          class: ['m-1', 'position-relative'],
          key: slug
        },
        [$content]
      )
    }

    return h(
      'div',
      mergeData(data, {
        staticClass: CLASS_NAME,
        class: [
          type,
          'd-flex',
          'flex-wrap',
          'mx-n2',
          'text-center',
          'justify-content-center',
          'font-weight-bold'
        ]
      }),
      contributors.map(contributor => renderContributor(contributor))
    )
  }
}
