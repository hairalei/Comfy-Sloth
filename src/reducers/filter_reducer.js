import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let maxPrice = action.payload.map((p) => p.price);
      maxPrice = Math.max(...maxPrice);

      return {
        ...state,
        allProducts: [...action.payload],
        filteredProducts: [...action.payload],
        filters: { ...state.filters, maxPrice, price: maxPrice },
      };

    case SET_GRIDVIEW:
      return { ...state, gridView: true };

    case SET_LISTVIEW:
      return { ...state, gridView: false };

    case UPDATE_SORT:
      return { ...state, sort: action.payload };

    case SORT_PRODUCTS:
      const { sort, filteredProducts } = state;
      let tempProducts = [...filteredProducts];

      if (sort === 'price-lowest') {
        tempProducts = tempProducts.sort((a, b) => {
          return a.price - b.price;
        });
      }

      if (sort === 'price-highest') {
        tempProducts = tempProducts.sort((a, b) => {
          return b.price - a.price;
        });
      }

      if (sort === 'name-a') {
        tempProducts = tempProducts.sort((a, b) => {
          return a.name.toLowerCase().localeCompare(b.name);
        });
      }

      if (sort === 'name-z') {
        tempProducts = tempProducts.sort((a, b) => {
          return b.name.toLowerCase().localeCompare(a.name);
        });
      }
      return { ...state, filteredProducts: tempProducts };

    case UPDATE_FILTERS:
      const { name, value } = action.payload;

      return { ...state, filters: { ...state.filters, [name]: value } };

    case FILTER_PRODUCTS: {
      const { allProducts } = state;
      const { text, category, company, color, price, shipping } = state.filters;
      let tempProducts = [...allProducts];

      if (text) {
        tempProducts = tempProducts.filter((item) => {
          return item.name.toLowerCase().includes(text.toLowerCase());
        });
      }

      if (category) {
        tempProducts = tempProducts.filter((item) => {
          return category === 'all' ? tempProducts : item.category === category;
        });
      }

      if (company) {
        tempProducts = tempProducts.filter((item) => {
          return company === 'all' ? tempProducts : item.company === company;
        });
      }

      if (color) {
        tempProducts = tempProducts.filter((item) => {
          return color === 'all' ? tempProducts : item.colors.includes(color);
        });
      }

      if (price >= 0) {
        tempProducts = tempProducts.filter((item) => {
          return +item.price <= +price;
        });
      }

      if (shipping) {
        tempProducts = tempProducts.filter((item) => {
          return item.shipping;
        });
      }

      return { ...state, filteredProducts: tempProducts };
    }

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: '',
          company: 'all',
          category: 'all',
          color: 'all',
          price: state.filters.maxPrice,
          shipping: false,
        },
      };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
