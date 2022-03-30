import * as api from "../api/index";

import {
  ADD_NEW_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  FETCH_PRODUCTS_BY_USER,
  FETCH_PRODUCT,
  START_LOADING,
  END_LOADING,
} from "./constants";

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchProduct(id);
    dispatch({ type: FETCH_PRODUCT, payload: { product: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getProductsByUser = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchProductsByUser(searchQuery);
    console.log("get products called", data);
    dispatch({ type: FETCH_PRODUCTS_BY_USER, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.response);
  }
};

export const createProduct = (product, openSnackbar) => async (dispatch) => {
  try {
    const { data } = await api.addProduct(product);
    dispatch({ type: ADD_NEW_PRODUCT, payload: data });
    openSnackbar("Product added successfully");
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct =
  (id, product, openSnackbar) => async (dispatch) => {
    const { data } = await api.updateProduct(id, product);
    dispatch({ type: UPDATE_PRODUCT, payload: data });
    openSnackbar("Customer updated successfully");
    try {
    } catch (error) {
      console.log(error);
    }
  };

export const deleteProduct = (id, openSnackbar) => async (dispatch) => {
  try {
    await api.deleteProduct(id);

    dispatch({ type: DELETE_PRODUCT, payload: id });
    openSnackbar("Customer deleted successfully");
  } catch (error) {
    console.log(error);
  }
};
