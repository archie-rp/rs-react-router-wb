---
sidebar_position: 1
---

# Quick Start

## Installation

Install using [Yarn](https://yarnpkg.com):

```sh
yarn add @resourge/react-router
```

or NPM:

```sh
npm install @resourge/react-router --save
```

## Usage

```js
import React from 'react'

import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  Navigate,
  path,
  Redirect
} from '@resourge/react-router'
import { SetupPaths, path } from '@resourge/react-router/setupPaths';

// Lazy loads
const ProductList = React.lazy(() => import('./ProductList'));
// Lazy loads
const ProductForm = React.lazy(() => import('./ProductForm'));

const RoutePaths = SetupPaths({
  HOME: path(),
  PRODUCT: path('product')
  .routes({
    FORM: path().param('productId')
  })
})

function App() {
  return (
    <BrowserRouter>
      <button onClick={() => {
        window.history.pushState(null, '', RoutePaths.HOME.get())
      }}
      >
        Home
      </button>
      <Link
        to={RoutePaths.PRODUCT.get()}
      >
        Product List
      </Link>
      <Link
        to={
          RoutePaths.PRODUCT.FORM.get({
            productId: Math.random().toFixed(0)
          })
        }
      >
        Product
      </Link>
      <Switch>
        <Route path={RoutePaths.HOME.path}>
          Home
        </Route>
        <Route 
          path={RoutePaths.PRODUCT.path}
        >
          <ProductList />
        </Route>
        <Route path={RoutePaths.PRODUCT.FORM.path}>
          <ProductForm />
        </Route>
        {/* Redirect */}
        <Redirect from={'*'} to={RoutePaths.HOME.get()} />
        {/* OR */}
        <Navigate to={RoutePaths.HOME.get()} />
        {/* Redirect */}
      </Switch>
    </BrowserRouter>
  )
}

export default App

```

## SetupPaths

SetupPaths serves to simplify navigation between routes, by putting path creation, path transformation and useParams all in one place.

```js
// Build Routes
// It's Optional
// It's basically a helper to setup paths, returns {
//   path // actual built path. ex: '/product', '/product/:productId/
//   get // method that returns the path. In case the path contains 
//          params, the method will require an object containing the keys
//	        and values. ex:
//            RoutePaths.PRODUCT.FORM.get({
//              productId: '....'
//            })
//   useParams // react hook that returns the params of the route. 
//                Depending on the 'options' ("param('productId', <<options>>)")
//                it will automatically transform the params into there respective value, ex:
//	                param('productId', {
//                    // Makes productId optional
//                    optional: true, 
//                    // Transforms productId from string to number
//                    transform: (productId) => Number(productId) 
//	                })
//                In this example 'const { productId } = RoutePaths.PRODUCT.FORM.useParams()', productId will be number because of transform
// }
import { SetupPaths, path } from '@resourge/react-router/setupPaths';

const RoutePaths = SetupPaths({
  HOME: path(),
  PRODUCT: path('product')
  .routes({
    FORM: path().param('productId'),
    FORMV2: path('v2')
	.param('productId', {
		transform: (productId) => Number(productId)
	})
	.param('productName', {
		optional: true
	})
  }),
  DELIVERY: path('delivery').param('id').addPath('details')
})


RoutePaths.HOME.path // '/home'
RoutePaths.HOME.get() // '/home'

RoutePaths.PRODUCT.path // '/product'
RoutePaths.PRODUCT.get() // '/product'

RoutePaths.PRODUCT.FORM.path // '/product/:productId'
RoutePaths.PRODUCT.FORM.get({ product: '1' }) // '/product/1'
RoutePaths.PRODUCT.FORM.useParams() // '{ productId: '1' }'

RoutePaths.PRODUCT.FORMV2.path // '/product/v2/:productId/{:productName?}'
RoutePaths.PRODUCT.FORMV2.get({ product: 1 }) // '/product/v2/1/'
RoutePaths.PRODUCT.FORMV2.useParams() // '{ productId: 1, productName: undefined }'

RoutePaths.DELIVERY.path // '/delivery/:id/details'
RoutePaths.DELIVERY.get({ id: 1 }) // '/delivery/1/details'
RoutePaths.DELIVERY.useParams() // '{ id: 1 }'
```

## BrowserRouter

First component that creates the context for the rest of the children. 
_Note: This component mainly uses `useUrl` hook from '@resourge/react-search-params'._

```js
import { BrowserRouter } from '@resourge/react-router'

function App() {
  return (
    <BrowserRouter>
	  ....
    </BrowserRouter>
  )
}
```

## Route

Component that only renders at a certain path. 
_Note: This component mainly uses `useMatchRoute` hook._

```js
import { Route } from '@resourge/react-router'

<Route 
	path={'/'} // Route path(s), can be an array
	// exact // Makes it so 'URL' path needs to be exactly as the path (default: false)
	// hash // Turn 'route' into 'hash route' (default: false)
	// component={<>Home page</>} When defined Route children will be injected into the component
>
	Home page
</Route>
```

## Link

Component extends element `a` and navigates to `to`. 
_Note: This component mainly uses `useLink` hook to navigate to `to` and `useMatchRoute` to match route._ 
_Note: 'to' also gets [normalize](##normalize)_

```js
import { Link } from '@resourge/react-router'

<Link
  to={'/'}
>
  Home Link
</Link>
```

## Navigate

Navigates to `to`. 
_Note: This component mainly uses `useNavigate` hook to navigate to `to`._ 
_Note: 'to' also gets [normalize](##normalize)_

```js
import { Navigate } from '@resourge/react-router'

<Navigate
  to={'/'}
/>
```

## Prompt

Component for prompting the user before navigating. 
_Note: This component mainly uses `usePrompt` hook._

```js
import { Prompt } from '@resourge/react-router'

<Prompt
  // Boolean that defines if it's going to be triggered on route change
  // Can be a method "(routeUrl: URL, url: URL, action: EVENTS) => boolean"
  when={true} 
/>
```

## Redirect

Navigates from `path` to `to`. 
_Note: This component uses the component Route and Navigate._ 
_Note: 'to' also gets [normalize](##normalize)_

```js
import { Redirect } from '@resourge/react-router'

<Redirect from={'*'} to={'/'} />
```

## SearchRoute

Component that only renders at a certain `search`. 
_Note: This component mainly uses `useSearchRoute` hook._

```js
import { SearchRoute } from '@resourge/react-router'

<SearchRoute 
  search={'name'} // Path SearchParams, can be an array
  // exact // Makes it so 'URL' path needs to be exactly as the path (default: false)
  // hash // Turn 'route' into 'hash route' (default: false)
  // component={<>Home page</>} When defined Route children will be injected into the component
>
  Component
</SearchRoute>
```

## Switch

Component that makes sure the first matching path renders. 
_Note: This component mainly uses `useSwitch` hook._

```js
import { Switch } from '@resourge/react-router'

<Switch>
  <Route path={'/'}>
    HomePage
  </Route>
  <Route path={'/product'}>
    ProductPage
  </Route>
</Switch>
```

## Why

I love react-router, but the new version it's just not for me. It takes a lot of freedom and functionalities (prompt) for few specific new functionalities (loader, etc).
Things I dislike about the new react-router version:
  - Removal of multiple "path"'s;
  - Removal of optional params and having to duplicate routes feels uglier;
  - Removal of prompt/blocker;
  - Not being able to put layout/components inside routes and having to use outlet for routes that most of  the times are specific to a specific page;
  - Having to duplicate a lot of routes;
  - Removal of custom Route's, for example "ProtectedRoute";


## License

MIT Licensed.
