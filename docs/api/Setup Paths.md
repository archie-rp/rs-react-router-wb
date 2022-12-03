---
sidebar_position: 2
---

SetupPaths serves to simplify navigation between routes, by putting path creation, path transformation and useParams all in one place.

```jsx
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