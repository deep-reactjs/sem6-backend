import {
  ALL_CATEGORIES,
  ADD_NEW_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  FETCH_CATEGORIES_BY_USER,
  FETCH_CATEGORY,
  START_LOADING,
  END_LOADING,
} from "../actions/constants";

const categories = (state = { isLoading: true, categories: [] }, action) => {
  console.log(action);
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case ALL_CATEGORIES:
      return {
        ...state,
        categories: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_CATEGORIES_BY_USER:
      return { ...state, categories: action.payload };

    case FETCH_CATEGORY:
      return { ...state, category: action.payload.category };
    case ADD_NEW_CATEGORY:
      return {
        ...state,
        categories: [
          ...state.categories,
          { category: action.payload, subCategories: [] },
        ],
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((category) =>
          category._id === action.payload._id ? action.payload : category
        ),
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.category._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default categories;

//   const clients =(clients =[], action) => {
//     switch (action.type) {
//         case ALL_CLIENTS:
//             return action.payload

//         case FETCH_CLIENTS_BY_USER:
//             return action.payload

//         case ADD_NEW_CLIENT:
//             return [...clients, action.payload]

//         case UPDATE_CLIENT:
//             return clients.map((client) => client._id === action.payload ? action.payload : client)

//         case DELETE_CLIENT:
//         return clients.filter((client) => client._id !== action.payload)

//         default:
//             return clients;
//     }
// }

// export default clients
