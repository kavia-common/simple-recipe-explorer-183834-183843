import Blits from '@lightningjs/blits'
import SearchBar from '../components/SearchBar.js'
import RecipeCard from '../components/RecipeCard.js'
import { getRecipes } from '../data/recipes.js'

/**
 * PUBLIC_INTERFACE
 * Home page: Contains search and a grid of recipe cards.
 */
export default Blits.Component('Home', {
  components: { SearchBar, RecipeCard },

  state() {
    const items = getRecipes()
    return {
      query: '',
      recipes: items,
      columns: 4,
      cardW: 400,
      cardH: 360,
      gapX: 40,
      gapY: 40,
      scrollY: 0,
      focusIndex: 0
    }
  },

  template: `
    <Element w="1760" h="840">
      <!-- Subtitle -->
      <Text x="0" y="0" :content="$subtitle" :textColor="$appTheme.text" fontSize="28" />

      <!-- Search -->
      <Element x="0" y="50" w="1760" h="90">
        <SearchBar :query="$query" @onChange="$onQueryChanged" />
      </Element>

      <!-- Empty/Results State -->
      <Text x="0" y="154" :content="$resultsLabel" :textColor="$mutedText" fontSize="22" />

      <!-- Grid area -->
      <Element x="0" y="190" w="1760" h="650" clip="true">
        <!-- Cards (positioned manually) -->
        <Element :for="(item, i) in $recipes" :key="$item.id">
          <RecipeCard
            :recipe="$item"
            :x="$cardX($i)"
            :y="$cardY($i) - $scrollY"
          />
        </Element>
        <!-- Empty state message -->
        <Text x="20" y="20" :content="$emptyMessage" :textColor="$mutedText" fontSize="26" :alpha="$isEmpty ? 1 : 0" />
      </Element>
    </Element>
  `,

  computed: {
    appTheme() {
      return this.$app.theme
    },
    subtitle() {
      return 'Discover delicious recipes'
    },
    resultsLabel() {
      const c = (this.recipes || []).length
      return c > 0 ? `${c} recipe${c === 1 ? '' : 's'} found` : ''
    },
    isEmpty() {
      return (this.recipes || []).length === 0
    },
    emptyMessage() {
      return this.isEmpty ? 'No recipes match your search.' : ''
    },
    mutedText() {
      const t = this.$app.theme.text
      return (t & 0xffffff) | 0x77000000
    }
  },

  methods: {
    // PUBLIC_INTERFACE
    /** Recompute filtered items when the query changes. */
    onQueryChanged(text) {
      this.query = text || ''
      this.recipes = getRecipes(this.query)
      // reset focus/scroll when search changes
      this.focusIndex = 0
      this.scrollY = 0
    },

    cardX(i) {
      const c = this.columns
      const col = i % c
      return col * (this.cardW + this.gapX)
    },

    cardY(i) {
      const c = this.columns
      const row = Math.floor(i / c)
      return row * (this.cardH + this.gapY)
    },

    // maintain in-bounds focus index
    clampFocus(idx) {
      const max = Math.max(0, (this.recipes?.length || 1) - 1)
      return Math.max(0, Math.min(idx, max))
    },

    ensureVisible(idx) {
      const y = this.cardY(idx)
      const viewH = 650
      const top = this.scrollY
      const bottom = this.scrollY + viewH
      const cardBottom = y + this.cardH
      if (y < top) this.scrollY = y
      else if (cardBottom > bottom) this.scrollY = cardBottom - viewH
    }
  },

  input: {
    left() {
      const c = this.columns
      const next = this.clampFocus(this.focusIndex - 1)
      if (Math.floor(this.focusIndex / c) === Math.floor(next / c)) {
        this.focusIndex = next
        this.ensureVisible(this.focusIndex)
        return true
      }
      return false
    },
    right() {
      const next = this.clampFocus(this.focusIndex + 1)
      this.focusIndex = next
      this.ensureVisible(this.focusIndex)
      return true
    },
    up() {
      const c = this.columns
      const next = this.clampFocus(this.focusIndex - c)
      if (next !== this.focusIndex) {
        this.focusIndex = next
        this.ensureVisible(this.focusIndex)
        return true
      }
      return false
    },
    down() {
      const c = this.columns
      const next = this.clampFocus(this.focusIndex + c)
      if (next !== this.focusIndex) {
        this.focusIndex = next
        this.ensureVisible(this.focusIndex)
        return true
      }
      return false
    },
    enter() {
      // Delegate enter to the selected card by navigating directly
      const item = (this.recipes || [])[this.focusIndex]
      if (item) {
        this.$router.to(`/recipe/${item.id}`)
        return true
      }
      return false
    },
    back() {
      // Bubble up to App if necessary
      return false
    }
  }
})
