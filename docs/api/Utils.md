---
sidebar_position: 3
---

### generatePath

Converter param's of path into there respective value.

```jsx
import { generatePath } from '@resourge/react-router'

const newPath = generatePath('/product/:productId', { productId: 1 })
```
### resolveLocation

Method to resolve `URL`'s.
_Note: 'to' also gets [normalize](#normalize)_

```jsx
import { resolveLocation } from '@resourge/react-router'

const to = '../contact';

const newUrl = resolveLocation(to, '/home/dashboard') // URL pathName '/home/contact'
```

### matchPath

Method to match href to path

```jsx
import { matchPath } from '@resourge/react-router'

const math = matchPath('/product', {
	path: '/product'
});
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