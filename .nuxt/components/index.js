export { default as Accordion } from '../../components/Accordion.vue'
export { default as AccordionItem } from '../../components/AccordionItem.vue'
export { default as GlobalButton } from '../../components/GlobalButton.vue'
export { default as Header } from '../../components/Header.vue'
export { default as Loader } from '../../components/Loader.vue'
export { default as Notification } from '../../components/Notification.vue'
export { default as NuxtLogo } from '../../components/NuxtLogo.vue'
export { default as ReviewCard } from '../../components/ReviewCard.vue'
export { default as Tutorial } from '../../components/Tutorial.vue'
export { default as HomeEmployeeComponent } from '../../components/home/EmployeeComponent.vue'
export { default as HomeEmployerComponent } from '../../components/home/EmployerComponent.vue'
export { default as HomeFooter } from '../../components/home/HomeFooter.vue'
export { default as HomeTipperComponent } from '../../components/home/TipperComponent.vue'
export { default as InputsInputField } from '../../components/inputs/InputField.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
