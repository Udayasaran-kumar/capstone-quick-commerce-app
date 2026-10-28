# Snapmart

React Native CLI app with Android and iOS projects. Sign-up and sign-in use Firebase email and password authentication.

## What is implemented

- Firebase Authentication (`createUserWithEmailAndPassword` and `signInWithEmailAndPassword`)
- Home screen that loads products with `fetch` from `https://backend.ecom.subraatakumar.com/api/v1/allproducts`
- Zustand store for the login flag, the product list, and cart items
- Add to cart from the home screen, which appends the selected product to that list
- `src/screens/Cart.jsx`, which can list cart items, remove one, and total prices
- Screenshots in `images/img1.jpg`, `images/img2.jpg`, `images/img3.jpg`, and `images/img4.jpg`

`axios` is imported in `src/App.jsx` and is not called. Product data is loaded with `fetch`.

`Cart.jsx` is not mounted by the screen `App` renders. `MyTabs` defines a Home and Cart tab navigator and is not used. The cart button on the home screen does not open the cart.

## Tests

`__tests__/App.test.tsx` is the Jest file shipped by the React Native CLI template.

## Not in this repository

Search, checkout, order history, a drawer navigator, dark mode, and an Expo app are not implemented here.
