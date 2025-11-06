 /**
  * PUBLIC_INTERFACE
  * Export mock recipes for local usage when no backend is configured.
  * Shape:
  * id: number|string
  * title: string
  * description: string
  * image: string (path inside public/assets)
  * ingredients: string[]
  * steps: string[]
  * keywords: string[]
  */
export const mockRecipes = [
  {
    id: 1,
    title: 'Lemon Garlic Salmon',
    description: 'Pan-seared salmon with lemon, garlic, and herbs for a bright, clean flavor.',
    image: 'assets/recipe-salmon.jpg',
    ingredients: [
      '2 salmon fillets',
      '2 cloves garlic, minced',
      '1 lemon (zest and juice)',
      '1 tbsp olive oil',
      'Salt and pepper',
      'Fresh parsley'
    ],
    steps: [
      'Season salmon with salt and pepper.',
      'Heat oil in a pan over medium-high heat.',
      'Sear salmon skin-side down for 3–4 minutes.',
      'Flip, add garlic and lemon zest.',
      'Finish with lemon juice and parsley.'
    ],
    keywords: ['fish', 'healthy', 'quick', 'seafood', 'dinner']
  },
  {
    id: 2,
    title: 'Creamy Mushroom Pasta',
    description: 'Silky pasta in a garlic mushroom cream sauce with parmesan.',
    image: 'assets/recipe-pasta.jpg',
    ingredients: [
      '200g pasta',
      '250g mushrooms, sliced',
      '2 cloves garlic, minced',
      '200ml cream',
      'Parmesan cheese',
      'Salt and pepper'
    ],
    steps: [
      'Cook pasta until al dente.',
      'Sauté mushrooms with garlic.',
      'Add cream; simmer gently.',
      'Toss pasta with sauce; finish with parmesan.'
    ],
    keywords: ['vegetarian', 'comfort', 'creamy', 'dinner']
  },
  {
    id: 3,
    title: 'Citrus Avocado Salad',
    description: 'A fresh salad with avocado, oranges, and a honey-lime dressing.',
    image: 'assets/recipe-salad.jpg',
    ingredients: [
      '2 oranges, segmented',
      '1 avocado, sliced',
      'Mixed greens',
      '1 tbsp honey',
      '1 lime (juice)',
      'Olive oil, salt, pepper'
    ],
    steps: [
      'Whisk honey, lime juice, olive oil, salt, and pepper.',
      'Toss greens with dressing.',
      'Top with oranges and avocado slices.'
    ],
    keywords: ['salad', 'light', 'healthy', 'lunch']
  }
]

/**
 * PUBLIC_INTERFACE
 * Fetch recipes with an optional text filter across title, description, and keywords.
 * If env vars VITE_API_BASE/VITE_BACKEND_URL are present, code could be extended to fetch remotely.
 */
export function getRecipes(filterText = '') {
  const text = (filterText || '').toLowerCase().trim()
  if (!text) return mockRecipes
  return mockRecipes.filter(r => {
    const hay = `${r.title} ${r.description} ${(r.keywords || []).join(' ')}`.toLowerCase()
    return hay.includes(text)
  })
}

/**
 * PUBLIC_INTERFACE
 * Get a single recipe by id (number or string).
 */
export function getRecipeById(id) {
  const sid = String(id)
  return mockRecipes.find(r => String(r.id) === sid)
}
