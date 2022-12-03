---
sidebar_position: 1
---

All the hooks we provide.

## useBeforeURLChange

Fires before the route changes.
If result:
  `true` routing will occur normally
  `false` will prevent route from changing

```jsx
import { useBeforeURLChange } from '@resourge/react-router'

useBeforeURLChange(() => {
  return true; // or false
})
```

## useBlocker

Fires before the route change, and serves to block or not the current route.
Returns:
  isBlocking - true/false for if it is blocking
  next - Method that is going to call the original navigation

```jsx
import { useBlocker } from '@resourge/react-router'

const [isBlocking, next] = useBlocker(() => {
  return true; // or false
})
```

## useLink

Hook that returns 'href' and onClick method to navigate to link 
_Note: 'to' also gets [normalize](#normalize)_

```jsx
import { useLink } from '@resourge/react-router'

const [href, onClick] = useLink({
  to: '/product'
})
```

## useMatchRoute

Hook to match path to current `url`.
Returns null if it is a no match, otherwise returns match result.

```jsx
import { useMatchRoute } from '@resourge/react-router'

const match = useMatchRoute({
  path: '/product'
})
```

## useNavigate

Returns a method for navigation `to`. 
_Note: 'to' also gets [normalize](#normalize)_

```jsx
import { useNavigate } from '@resourge/react-router'

const navigate = useNavigate()
```

## useNormalizeUrl

Returns a method for normalize a url from `to`. 
_Note: 'to' also gets [normalize](#normalize)_

```jsx
import { useNormalizeUrl } from '@resourge/react-router'

const normalizeUrl = useNormalizeUrl()
...

const url = normalizeUrl('/product');
```

## useParams

Returns the current route params

```jsx
import { useParams } from '@resourge/react-router'

const params = useParams()

// or

const params = useParams((params) => {
  return {
    productId: Number(params.productId)
  }
})
```

## usePrompt

Fires before the route change and prompts the user
Returns:
  isBlocking - true/false for if it is blocking
  next - Method that is going to call the original navigation

```jsx
import { usePrompt } from '@resourge/react-router'

const [isBlocking, next] = usePrompt({
  // When `true` it will prompt the user 
  // before navigating away from a screen. 
  // (accepts method that return's boolean).
  when,
  // When set, will prompt the user with native `confirm` and message.
  // When `undefined` will wait `[1]` method to be called
  message
})
```

## useSearchParams

Returns the current search parameters and a method to change.

```jsx
import { useSearchParams } from '@resourge/react-router'

const [searchParams, setParams] = useSearchParams({} /* default params */)
```

## useSearchRoute

Hook to match search(s) to current `url`.

Returns null if it is a no match, otherwise returns match result.

```jsx
import { useSearchRoute } from '@resourge/react-router'

const match = useSearchRoute({
  search: 'name'
})
```

## useSwitch

Returns the first children component who props `path` or `search` matches the current location.

```jsx
import { useSwitch } from '@resourge/react-router'

const matchComponent = useSwitch(children)
```

## useRoute

Hook to access first parent 'Route'.

```jsx
import { useRoute } from '@resourge/react-router'

const route = useRoute()
```

## useRouter

Hook to access to current URL.

```jsx
import { useRouter } from '@resourge/react-router'

const { url, action } = useRouter()
```

## useAction

Hook to access action that lead to the current `URL`.

```jsx
import { useAction } from '@resourge/react-router'

const action = useAction()
```

## usePromptNext

To use inside Prompt components.
Contains the `next` method to navigate after "Prompt" is finished.

```jsx
import { usePromptNext } from '@resourge/react-router'

const next = usePromptNext()
```

## Normalize

Examples: 
```jsx
  baseUrl: /home/dashboard
  to: "/home" // /home
  to: "home" // /home/dashboard/home
  to: "about" // /home/dashboard/about
  to: "./about" // /home/dashboard/about
  to: "/about" // /about
  to: "../contact" // /home/contact
  to: "../../products" // /products
  to: "../../../products" // /products
```