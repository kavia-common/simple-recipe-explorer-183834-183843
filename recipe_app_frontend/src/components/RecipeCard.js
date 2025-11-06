import Blits from '@lightningjs/blits'

/**
 * PUBLIC_INTERFACE
 * RecipeCard component
 * Props:
 * - recipe: { id, title, description, image }
 * - x, y: positioning provided by parent grids
 * Behavior:
 * - On enter, navigates to /recipe/:id
 */
export default Blits.Component('RecipeCard', {
  props: ['recipe', 'x', 'y'],

  state() {
    return {
      hovered: false
    }
  },

  template: `
    <Element :x="$x" :y="$y" w="400" h="360">
      <!-- Card Surface -->
      <Element w="400" h="360" :color="$appTheme.surface" alpha="1" />
      <!-- Shadow -->
      <Element w="400" h="360" color="0x000000ff" alpha="0.06" />
      <!-- Accent top border when hovered -->
      <Element w="400" h="6" :color="$accentColor" :alpha="$hoverAlpha" />

      <!-- Image -->
      <Element x="0" y="6" w="400" h="220" :src="$imageSrc" />

      <!-- Title -->
      <Text x="20" y="240" w="360" :content="$title" :textColor="$appTheme.text" fontSize="28" />

      <!-- Description -->
      <Text x="20" y="280" w="360" :content="$shortDesc" :textColor="$descColor" fontSize="22" />
    </Element>
  `,

  computed: {
    appTheme() {
      return this.$app.theme
    },
    imageSrc() {
      // Lightning requires both w and h which we supply in template; ensure asset path
      return this.recipe?.image || 'assets/placeholder-recipe.jpg'
    },
    title() {
      return this.recipe?.title || 'Untitled'
    },
    shortDesc() {
      const d = this.recipe?.description || ''
      return d.length > 62 ? d.slice(0, 59) + '...' : d
    },
    descColor() {
      // subtle
      const t = this.$app.theme.text
      return (t & 0xffffff) | 0x88000000
    },
    accentColor() {
      return this.$app.theme.secondary
    },
    hoverAlpha() {
      return this.hovered ? 0.9 : 0.3
    }
  },

  methods: {
    focus() {
      this.hovered = true
    },
    unfocus() {
      this.hovered = false
    }
  },

  input: {
    enter() {
      if (this.recipe?.id != null) {
        this.$router.to(`/recipe/${this.recipe.id}`)
        return true
      }
      return false
    }
  }
})
