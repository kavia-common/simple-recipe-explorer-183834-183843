import Blits from '@lightningjs/blits'
import { getRecipeById } from '../data/recipes.js'

/**
 * PUBLIC_INTERFACE
 * RecipeDetail page
 * Props (from route): id
 * Shows image, ingredients list and steps with Ocean Professional theme.
 */
export default Blits.Component('RecipeDetail', {
  props: ['id'],

  state() {
    const recipe = getRecipeById(this.id)
    return {
      recipe,
      scrollY: 0
    }
  },

  template: `
    <Element w="1760" h="840">
      <!-- Header Area -->
      <Text x="0" y="0" :content="$titleText" :textColor="$appTheme.text" fontSize="32" />
      <Text x="0" y="44" :content="$subtitleText" :textColor="$mutedText" fontSize="22" />

      <!-- Content -->
      <Element x="0" y="90" w="1760" h="750" clip="true">
        <!-- Image -->
        <Element x="0" :y="- $scrollY" w="800" h="450" :src="$imageSrc" />

        <!-- Ingredients -->
        <Text x="830" :y="- $scrollY" content="Ingredients" :textColor="$accent" fontSize="28" />
        <Element x="830" :y="36 - $scrollY" w="930" h="300">
          <Element :for="(ing, i) in $ingredients" :key="$i">
            <Text :x="0" :y="$i * 30" :content="'• ' + $ing" :textColor="$contentText" fontSize="22" />
          </Element>
        </Element>

        <!-- Steps -->
        <Text x="0" :y="470 - $scrollY" content="Steps" :textColor="$accent" fontSize="28" />
        <Element x="0" :y="506 - $scrollY" w="1760" h="600">
          <Element :for="(s, i) in $steps" :key="$i">
            <Text :x="0" :y="$i * 34" :content="($i + 1) + '. ' + $s" :textColor="$contentText" fontSize="22" />
          </Element>
        </Element>
      </Element>
    </Element>
  `,

  computed: {
    appTheme() {
      return this.$app.theme
    },
    titleText() {
      return this.recipe ? this.recipe.title : 'Recipe'
    },
    subtitleText() {
      return this.recipe ? (this.recipe.description || '') : 'Recipe details'
    },
    imageSrc() {
      return this.recipe?.image || 'assets/placeholder-recipe.jpg'
    },
    ingredients() {
      return this.recipe?.ingredients || []
    },
    steps() {
      return this.recipe?.steps || []
    },
    accent() {
      return this.$app.theme.secondary
    },
    contentText() {
      return this.$app.theme.text
    },
    mutedText() {
      const t = this.$app.theme.text
      return (t & 0xffffff) | 0x77000000
    }
  },

  input: {
    up() {
      this.scrollY = Math.max(0, this.scrollY - 40)
      return true
    },
    down() {
      this.scrollY = this.scrollY + 40
      return true
    },
    back() {
      this.$router.back()
      return true
    }
  }
})
