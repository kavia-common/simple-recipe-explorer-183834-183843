import Blits from '@lightningjs/blits'
import Home from './pages/Home.js'
import RecipeDetail from './pages/RecipeDetail.js'

/**
 * PUBLIC_INTERFACE
 * Default exported Lightning Application.
 * This is the root of the Recipe Explorer UI.
 * It defines routes and renders the RouterView. Theme colors are configured inline.
 */
export default Blits.Application({
  name: 'RecipeExplorerApp',

  // Theming (Ocean Professional)
  state() {
    return {
      theme: {
        primary: 0x2563ebff,   // #2563EB
        secondary: 0xf59e0bff, // #F59E0B
        error: 0xef4444ff,     // #EF4444
        background: 0xf9fafbff, // #f9fafb
        surface: 0xffffffff,   // #ffffff
        text: 0x111827ff       // #111827
      },
      title: 'Recipe Explorer'
    }
  },

  components: {
    Home,
    RecipeDetail
  },

  template: `
    <Element w="1920" h="1080" :color="$theme.background">
      <!-- Subtle top gradient bar for modern feel -->
      <Element w="1920" h="240" :color="$theme.primary" alpha="0.08" />

      <!-- Header / AppBar -->
      <Element x="80" y="40" w="1760" h="120" :color="$theme.surface" alpha="1" rotation="0" scale="1">
        <!-- Shadow effect via overlay -->
        <Element w="1760" h="120" color="0x000000ff" alpha="0.04" />
        <Text x="40" y="35" :content="$title" :textColor="$theme.text" fontSize="48" />
        <!-- Mini brand accent -->
        <Element x="1680" y="36" w="12" h="48" :color="$theme.secondary" />
      </Element>

      <!-- Router outlet -->
      <Element x="80" y="180" w="1760" h="840">
        <RouterView />
      </Element>
    </Element>
  `,

  // Router declarations
  routes: [
    { path: '/', component: Home, options: { title: 'Home' } },
    { path: '/recipe/:id', component: RecipeDetail, options: { title: 'Recipe Detail' } }
  ]
})
