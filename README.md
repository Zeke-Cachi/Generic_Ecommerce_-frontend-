# Generic E-Commerce (frontend)

Presenting "Generic E-Commerce", a complete ecommerce site, where you can purchase all kind of item, as well as publish your stuff to sell!

---

## Stack used

- Next.js
- Typescript
- Tailwind

#### Libraries

- DaisyUI
- Slick-Carousel
- Dotenv
- React-hot-toast
- React-icons
- Sweetalert2
- Axios

---

#### The project has three Contexts for global management:

1. UtilsContext (for general management)
2. UserContext (for everything relating user data)
3. CartContext (for everything relating the cart or the products)

---

The cart functionality was made using the useReducer hook (CartReducer). Allows to add to cart, remove from cart, remove all instances of a single product, and delete the whole cart, as well as an initializer for when the products are loaded. 

---

### Extras

There´s some extra files, that define functionalities that didn´t fit anywhere else:

- functions.tsx --> Has some scrolling functions and an export for the server url
- CustomHooks.tsx --> Has a couple of custom hooks, mainly to directly call the contexts, and others to handle the screen dimentions
-  typesAndInterfaces.tsx --> Here are all the types and Interfaces used in the whole project
