import { VueConstructor } from 'vue'
import VStateSelect from './VStateSelect'

const VAddressFields = {
  install (Vue: VueConstructor, options?: any) {
    Vue.component('v-state-select', VStateSelect)
  },
}

export { VStateSelect }
export default VAddressFields

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VAddressFields)
}
