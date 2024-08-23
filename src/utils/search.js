//Filter Object
export const filterObject = {
  size: "",
  brand: "",
  wrapper: "",
  priceTarget: [0, 1000],
  minPrice: undefined,
  maxPrice: undefined,
};

//Check if product matches category filter
const size = (product, filter) => {
  return filter.category === "" || product.size.includes(filter.size);
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
  const matchesSize = size(product, filter);
  const matchesBrand = brand(product, filter);
  const matchesWrapper = wrapper(product, filter);
  const matchesPrice = filter.priceTarget
    ? product.priceForSingle >= filter.priceTarget[0] &&
      product.priceForSingle <= filter.priceTarget[1]
    : true;

  return matchesSize && matchesBrand && matchesWrapper && matchesPrice;
};

//Handlers
//Brand filter
export const handleBrandChange = (e, setFilter) => {
  console.log(e);
  setFilter((prev) => ({ ...prev, brand: e }));
};

//Price for single filter
export const handlePriceChangeLow = (e, setFilter) => {
  setFilter((prev) => ({
    ...prev,
    priceTarget: [e, prev.priceTarget[1]],
  }));
};

//Price for single filter
export const handlePriceChangeHigh = (e, setFilter) => {
  setFilter((prev) => ({
    ...prev,
    priceTarget: [prev.priceTarget[0], e],
  }));
};

//Size filter
export const handleSizeChange = (e, setFilter) => {
  console.log(e);
  setFilter((prev) => ({ ...prev, size: e }));
};

//Wrapper filter
export const handleWrapperChange = (e, setFilter) => {
  setFilter((prev) => ({ ...prev, wrapper: e }));
};
