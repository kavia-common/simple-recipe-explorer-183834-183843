import Blits from '@lightningjs/blits'

/**
 * PUBLIC_INTERFACE
 * SearchBar component
 * Props:
 * - query: current string
 * Events:
 * - onChange(text): emitted whenever text updates
 */
export default Blits.Component('SearchBar', {
  props: ['query'],

  state() {
    return {
      text: this.query || '',
      focused: false
    }
  },

  watch: {
    query(v) {
      this.text = v || ''
    }
  },

  template: `
    <Element w="1760" h="90">
      <!-- Input background -->
      <Element w="1760" h="90" color="0xffffffff" :color="$parentApp.theme.surface" />
      <!-- Border / Shadow -->
      <Element w="1760" h="90" color="0x000000ff" alpha="0.06" />

      <!-- Icon -->
      <Element x="24" y="25" w="40" h="40" :color="$parentApp.theme.primary" alpha="0.9" />

      <!-- Placeholder / Text -->
      <Text x="80" y="28" :content="$displayText" :textColor="$textColor" fontSize="36" />
    </Element>
  `,

  computed: {
    displayText() {
      return (this.text && this.text.length > 0) ? this.text : 'Search recipes...'
    },
    textColor() {
      const theme = this.parentApp.theme
      return (this.text && this.text.length > 0) ? theme.text : (theme.text & 0xffffff) | 0x66000000 // slightly muted placeholder
    },
    parentApp() {
      // Helper to reach app state for theme colors
      return this.$app
    }
  },

  methods: {
    // PUBLIC_INTERFACE
    /** Emit onChange with the new text value. */
    emitChange() {
      if (this.onChange) this.onChange(this.text)
    },
    // PUBLIC_INTERFACE
    /** Clear current input and notify parent. */
    clear() {
      this.text = ''
      this.emitChange()
    }
  },

  // Keyboard handling to simulate typing for demo/mock
  input: {
    left() {},
    right() {},
    up() {},
    down() {},
    enter() {
      // No-op: could be used to confirm a search
      return true
    },
    back() {
      // Backspace emulation: remove last char
      if (this.text && this.text.length > 0) {
        this.text = this.text.slice(0, -1)
        this.emitChange()
        return true
      }
      // bubble up if empty
      return false
    },
    // Custom text entry mapping using keypress events from Blits
    // Blits maps alphanumerics to e.key for Web; here we accept printable keys.
    key(e) {
      if (!e || !e.key) return false
      const k = e.key
      if (k.length === 1 && k.match(/^[a-zA-Z0-9 \-_'.,]$/)) {
        this.text = (this.text || '') + k
        this.emitChange()
        return true
      }
      if (k === 'Space') {
        this.text = (this.text || '') + ' '
        this.emitChange()
        return true
      }
      return false
    }
  }
})
