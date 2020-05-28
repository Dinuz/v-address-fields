// Imported Types
/// <reference path="../node_modules/vuetify/src/globals.d.ts" />
// @ts-ignore
import Vue from 'vue'
// import { VuetifyThemeVariant } from 'vuetify/types/services/theme'
// import { ElementStyles } from '../types'

// 3rd Party Libs
// import merge from 'deepmerge' // EXAMPLE; You can remove this if you have no 3rd party libs
// @ts-ignore
import { UsaStates } from 'usa-states'

// Styles
import './VStateSelect.sass'

// @ts-ignore
import { VAutocomplete } from 'vuetify/lib'

// Create Base Mixins and Define Custom Properties
const base = Vue.extend({ mixins: [VAutocomplete] })
interface options extends InstanceType<typeof base> {
  /**
   * !Props unique to VStateSelect
   */
  contiguousOnly: boolean
  exclude: string[]
  includeTerritories: boolean
}

// Extend VAutocomplete to define the VStateSelect component
export default base.extend<options>().extend({
  name: 'v-state-select',
  props: {
    contiguousOnly: {
      type: Boolean,
      default: false,
    },
    exclude: {
      type: Array,
      default: () => [],
    },
    includeTerritories: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    allItems (): object[] {
      const { contiguousOnly, exclude, includeTerritories } = this
      const usaStates = new UsaStates({
        contiguousOnly,
        exclude,
        includeTerritories,
      })
      return usaStates.format({
        $text: 'name',
        $value: 'abbr',
      })
    },
    classes (): object {
      return {
        ...VAutocomplete.options.computed.classes.call(this),
        'v-state-select': true,
      }
    },
  },
})
