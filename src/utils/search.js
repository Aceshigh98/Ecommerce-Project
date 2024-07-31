//Filter Object
export const filterObject = {
  category: "",
  brand: "",
  wrapper: "",
  priceTarget: undefined,
  minPrice: undefined,
  maxPrice: undefined,
};

//Check if product matches category filter
const category = (product, filter) => {
  return filter.category === "" || product.category.includes(filter.category);
};

//Check if product matches brand filter
const brand = (product, filter) => {
  return filter.brand === "" || product.brand.includes(filter.brand);
};

//Check if product matches wrapper filter
const wrapper = (product, filter) => {
  return filter.wrapper === "" || product.wrapper.includes(filter.wrapper);
};

// Function to find the lowest price
export const minPrice = (products) => {
  if (!products || products.length === 0) throw Error("No products detected!");
  return Math.min(...products.map((product) => product.priceForSingle));
};

// Function to find the highest price
export const maxPrice = (products) => {
  if (!products || products.length === 0) throw Error("No products detected!");
  return Math.max(...products.map((product) => product.priceForSingle));
};

//Filter Main
export const filterMain = (product, filter) => {
  const matchesCategory = category(product, filter);
  const matchesBrand = brand(product, filter);
  const matchesWrapper = wrapper(product, filter);
  const matchesPrice = filter.priceTarget
    ? product.priceForSingle >= filter.priceTarget[0] &&
      product.priceForSingle <= filter.priceTarget[1]
    : true;

  return matchesCategory && matchesBrand && matchesWrapper && matchesPrice;
};

//Handlers
export const handleCategoryChange = (e, setFilter) => {
  setFilter((prev) => ({ ...prev, category: e.target.value }));
};

//Price for single filter
export const handlePriceChange = (e, setFilter) => {
  setFilter((prev) => ({
    ...prev,
    priceTarget: e,
  }));
};
