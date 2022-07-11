export default {
  name: 'ClientOnly',
  functional: true,
  props: {
    placeholder: String,
    placeholderTag: {
      type: String,
      default: 'div'
    }
  },
  render(h, { props, children }) {
    // check if the window or document is defined
    // if not, we're on the server
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      return children
    } else {
      return h(props.placeholderTag, {
        class: 'client-only'
      }, props.placeholder)
    }
  }
}