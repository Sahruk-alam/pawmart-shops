
export const routeTitles = {
  "/": "Home",
  "/pets-supplies": "Pets Supplies",
  "/add-listing": "Add Listing",
  "/my-listing": "My Listing",
  "/my-orders": "My Orders",
  "/login": "Login",
  "/signup": "Sign Up",
  "/category-filtered-product/:categoryName": "Category",
  "/details-page/:id": "Product Details",
};

export const setPageTitle = (title) => {
  document.title = `${title} | PawMart`;
};
