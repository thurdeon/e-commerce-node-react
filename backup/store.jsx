import {createSlice, configureStore } from '@reduxjs/toolkit';
import { data } from '../components/shop/FetchedProductsData.jsx'; 

const highestPossiblePrice = 1000000;

const filterByPrice = (data, minPrice, maxPrice) => {
   data.filter((item)=> item.price <= maxPrice && item.price >= minPrice)
};

const filterByString = (data, stringElement, string)=> {
   data.filter((item)=> item[stringElement] === string);
}




const initialCartState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    
}

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.itemId === newItem.id
      );

      if (!existingItem) {
        const newCartItem = {
          itemId: newItem.id,
          price: newItem.price,
          quantity: newItem.quantity || 1,
          totalPrice: (newItem.quantity || 1) * newItem.price,
          name: newItem.title,
          image: newItem.image
        };
        state.items.push(newCartItem)
        state.totalItems++;
        
        state.totalPrice += newCartItem.totalPrice;
      } else {
        if(newItem.quantity) {
          const itemPrice = existingItem.price * newItem.quantity;
          existingItem.quantity+= newItem.quantity
          existingItem.totalPrice += itemPrice; 
          state.totalPrice += itemPrice;  
        } else {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.price;
        state.totalPrice += existingItem.price;
}      }

  
      
    },

    removeItem(state, action) {
      const oldItem = action.payload;
      const existingItem = state.items.find((item) => item.itemId === oldItem.id);
      
      if (existingItem.quantity === 1) {
        
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price; 
        state.items = state.items.filter(item=>item.itemId !== existingItem.itemId)
        state.totalItems--;
        
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
      
      state.totalPrice -= existingItem.price;
      
      
    },

    clearCart(state) {
        state.items = [];
        state.totalItems= 0;
        state.totalPrice= 0;
    },
  },
});

const initialProductFilterState = {
iteproducts: data,
category: '',
priceRange: [0,highestPossiblePrice]
}

const productFilterSlice = createSlice({
  name: 'product',
  initialState: initialProductFilterState,
  reducers: {
      // filterByCategory(state, action) {
      //   if(action.payload.category) {
      //     const category = action.payload.category;
      //     state.category = category;
      //   }
        
      //   state.products = state.products

      // }


      // function countProductsByCategory(products) {
//   const categoryCounts = {};
//   products.forEach((product) => {
//     const category = product.category; // Assuming each product object has a 'category' property
//     if (categoryCounts[category]) {
//       categoryCounts[category]++;
//     } else {
//       categoryCounts[category] = 1;
//     }
//   });
//   return categoryCounts;
// }

// const filterPrice = (data, minPrice, maxPrice) => {
//     if(maxPrice === highestPossiblePrice) {
//       return data.filter((item)=> item.price !== maxPrice)
//     } else {
//    return data.filter((item)=> item.price <= maxPrice && item.price >= minPrice)
//   }
// };

// const filterCategory = (data, string)=> {
//   if(string ==='') {
//     return data.filter((item)=> item.category !== string); 
//   } else {
//    return data.filter((item)=> item.category === string);}
// }

// const filterSearch = (data, string)=> {
//   const regex = new RegExp(string, 'i')
//   return data.filter((item) => regex.test(item.title));
// }




// if(state.maxPrice !== highestPossiblePrice) {
        //   filteredSearch = filterPrice(filteredSearch, state.minPrice, state.maxPrice)
        // }

        
        // if(state.category!=='') {
        //   filteredSearch = filterCategory(filteredSearch, state.category)
        // } 

  }
})
const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        filter: productFilterSlice.reducer,
    }
})

export const {filterByCategory} = productFilterSlice.actions;
export const {addItem, removeItem, clearCart} = cartSlice.actions;

export default store;