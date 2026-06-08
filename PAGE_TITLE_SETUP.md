# Dynamic Page Title Implementation

This setup provides dynamic page titles for all routes in the PawMart application. The browser tab title will change based on the current page the user is viewing.

## How It Works

### 1. Custom Hook: `usePageTitle`

Located in `src/hooks/usePageTitle.js`

This hook automatically sets the document title whenever the component mounts.

**Usage:**

```javascript
import usePageTitle from "../../hooks/usePageTitle";

const MyComponent = () => {
  usePageTitle("Page Title");
  // component code...
};
```

### 2. Utility Function: `setPageTitle`

Located in `src/utils/pageTitle.js`

For cases where you need to set the title programmatically outside of a component:

**Usage:**

```javascript
import { setPageTitle } from "../../utils/pageTitle";

setPageTitle("My Custom Title");
```

## Configured Pages

All pages now have dynamic titles set:

| Route                                    | Title                     |
| ---------------------------------------- | ------------------------- |
| /                                        | Home \| PawMart           |
| /pets-supplies                           | Pets Supplies \| PawMart  |
| /add-listing                             | Add Listing \| PawMart    |
| /my-listing                              | My Listing \| PawMart     |
| /my-orders                               | My Orders \| PawMart      |
| /login                                   | Login \| PawMart          |
| /signup                                  | Sign Up \| PawMart        |
| /category-filtered-product/:categoryName | {categoryName} \| PawMart |
| /details-page/:id                        | {productName} \| PawMart  |

## Files Modified

1. **Created:**
   - `src/hooks/usePageTitle.js` - Custom hook for setting page titles
   - `src/utils/pageTitle.js` - Utility functions and route title mappings

2. **Updated (added usePageTitle hook):**
   - `src/component/Pages/Home.jsx`
   - `src/component/Pages/PetsSupplies.jsx`
   - `src/component/Pages/AddListing.jsx`
   - `src/component/Pages/MyListing.jsx`
   - `src/component/Pages/MyOrder.jsx`
   - `src/component/Users/Login.jsx`
   - `src/component/Users/SignUp.jsx`
   - `src/component/ExtraPage/DetailsPage.jsx`
   - `src/component/ExtraPage/FilterCategory.jsx`

## Features

✅ Automatic title updates on route change
✅ SEO-friendly page titles
✅ Fallback to component name if title not specified
✅ Consistent branding with "| PawMart" suffix
✅ Easy to customize for each page
✅ No additional dependencies required
