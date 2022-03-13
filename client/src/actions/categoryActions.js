import * as api from "../api/index";

import {
  ADD_NEW_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  FETCH_CATEGORIES_BY_USER,
  FETCH_CATEGORY,
  START_LOADING,
  END_LOADING,
} from "./constants";

export const getCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchCategory(id);
    dispatch({ type: FETCH_CATEGORY, payload: { category: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getCategoriesByUser = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchCategoriesByUser(searchQuery);
    console.log("get Categories called", data);
    dispatch({ type: FETCH_CATEGORIES_BY_USER, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.response);
  }
};

export const createCategory = (category, openSnackbar) => async (dispatch) => {
  try {
    const { data } = await api.addCategory(category);
    dispatch({ type: ADD_NEW_CATEGORY, payload: data });
    openSnackbar("category added successfully");
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory =
  (id, category, openSnackbar) => async (dispatch) => {
    const { data } = await api.updateCategory(id, category);
    dispatch({ type: UPDATE_CATEGORY, payload: data });
    openSnackbar("category updated successfully");
    try {
    } catch (error) {
      console.log(error);
    }
  };

export const deleteCategory = (id, openSnackbar) => async (dispatch) => {
  try {
    await api.deleteCategory(id);

    dispatch({ type: DELETE_CATEGORY, payload: id });
    openSnackbar("category deleted successfully");
  } catch (error) {
    console.log(error);
  }
};
