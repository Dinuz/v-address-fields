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

/**
 * !IMPORTANT: Import the Vuetify components you plan to extend here.
 *             VTextField is left here as an example. You should remove
 *             or replace it with the component you want to extend.
 */
// @ts-ignore
import { VAutocomplete } from 'vuetify/lib'

// Create Base Mixins and Define Custom Properties
const base = Vue.extend({ mixins: [VAutocomplete] })
interface options extends InstanceType<typeof base> {
  /**
   * !Props unique to YourComponent
   * Add properties of your project that TypeScript should know
   * about here.
   */
  foo: string

  /**
   * !Props inherited from VAutocomplete
   */
  items: Object[]
}

// Extend VTextField to define the YourComponent component
export default base.extend<options>().extend({
  name: 'v-state-select',
  props: {
    foo: {
      type: String,
      default: 'bar',
    },
  },
  data: () => ({
    usaStates: new UsaStates(),
  }),
  computed: {},
  watch: {},
  mounted () {
    this.items = this.usaStates.format({
      $text: 'name',
      $value: 'abbr',
    })
  },
  methods: {
    bar () {
      return 'baz'
    },
  },
})
