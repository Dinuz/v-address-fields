import Vue from 'vue'
// Utils
import { mount, MountOptions, Wrapper } from '@vue/test-utils'
//import { inspect } from 'util' // okay to delete this line if you don't use node inspect

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

describe('YourComponent', () => {
  describe('installer', () => {
    it('should register the your-component component', () => {
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
        const wrapper = mountFunction({
          propsData: { foo },
        })
        // replace the auto-generated `id` with one that matches
        const html = wrapper.html().replace(/div id="input-\d+"/, 'div id="input-1"')
        expect(html).toMatchSnapshot()
      })

      it('should have a property called `foo`', () => {
        const wrapper = mountFunction({ propsData: { foo } })
        expect(wrapper.vm.foo).toBeDefined()
        expect(wrapper.vm.foo).toBe('bar')
      })
    })

    describe('internal functions and events', () => {
      // @ts-ignore
      let wrapper
      beforeEach(() => {
        // capture console.warn
        const capture = (m: { toString: () => any }) => { messages.push(m.toString()) }
        jest.spyOn(global.console, 'warn').mockImplementation(capture)
        wrapper = mountFunction({
          propsData: { foo },
        })
      })

      it('bar() should return "baz"', () => {
        // @ts-ignore
        const result = wrapper.vm.bar()
        expect(result).toBe('baz')
      })
    })
  })
})
