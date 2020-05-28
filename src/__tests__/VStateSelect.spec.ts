import Vue from 'vue'
// Utils
import { mount, MountOptions, Wrapper } from '@vue/test-utils'
// import { inspect } from 'util' // okay to delete this line if you don't use node inspect

// Component to be tested
import VAddressFields, { VStateSelect } from '..'

// Mocks
const vuetifyMocks = {
  $vuetify: {
    theme: {
      currentTheme: {
        error: '#ff0000',
      },
      dark: false,
    },
    lang: {
      t: (val: string) => val,
    },
  },
}

// Data necessary for tests
const foo = 'bar'
const messages = []

describe('VStateSelect', () => {
  describe('installer', () => {
    it('should register the v-state-select component', () => {
      Vue.use(VAddressFields)
      expect(Vue.options.components['v-state-select']).toBeTruthy()
    })
  })

  describe('component', () => {
    type Instance = InstanceType<typeof VStateSelect>
    let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

    beforeEach(() => {
      mountFunction = (options?: MountOptions<Instance>) => {
        return mount(VStateSelect, {
          mocks: {
            ...vuetifyMocks,
          },
          ...options,
        })
      }
    })

    describe('initialization', () => {
      beforeEach(() => {
        // reset messages
        messages.length = 0
        // capture console messages to prevent them from cluttering the terminal
        const capture = (m: { toString: () => any }) => { messages.push(m.toString()) }
        jest.spyOn(global.console, 'error').mockImplementation(capture)
        jest.spyOn(global.console, 'warn').mockImplementation(capture)
        jest.spyOn(global.console, 'log').mockImplementation(capture)
      })

      it('should render component and match snapshot', () => {
        const wrapper = mountFunction()
        // replace the auto-generated `id` with one that matches
        const html = wrapper.html().replace(/div id="input-\d+"/, 'div id="input-1"')
        expect(html).toMatchSnapshot()
      })

      it('should have a property called <code>contiguousOnly</code> that defaults to <code>false</code>', () => {
        const wrapper = mountFunction()
        expect(wrapper.vm.contiguousOnly).toBeDefined()
        expect(wrapper.vm.contiguousOnly).toBe(false)
      })

      it('should have a property called <code>exclude</code> that defaults to an empty array', () => {
        const wrapper = mountFunction()
        expect(wrapper.vm.exclude).toBeDefined()
        expect(wrapper.vm.exclude).toStrictEqual([])
      })

      it('should have a property called <code>includeTerritories</code> that defaults to <code>false</code>', () => {
        const wrapper = mountFunction()
        expect(wrapper.vm.includeTerritories).toBeDefined()
        expect(wrapper.vm.includeTerritories).toBe(false)
      })
    })

    it('should generate a list of 51 "state" items', () => {
      const wrapper = mountFunction({ propsData: { foo } })
      expect(wrapper.vm.allItems).toBeDefined()
      expect(wrapper.vm.allItems).toHaveLength(51)
    })
  })
})
