import * as api from "../api/index";

import {
  ADD_NEW_SUBCATEGORY,
  UPDATE_SUBCATEGORY,
  DELETE_SUBCATEGORY,
} from "./constants";

export const createSubCategory =
  (subCategory, openSnackbar) => async (dispatch) => {
    try {
      const { data } = await api.addCategory(subCategory);
      dispatch({ type: ADD_NEW_SUBCATEGORY, payload: data });
      openSnackbar("Sub-Category added successfully");
    } catch (error) {
      console.log(error);
    }
  };

export const updateSubCategory =
  (id, subCategory, openSnackbar) => async (dispatch) => {
    const { data } = await api.updateSubCategory(id, subCategory);
    dispatch({ type: UPDATE_SUBCATEGORY, payload: data });
    openSnackbar("Sub-Category updated successfully");
    try {
    } catch (error) {
      console.log(error);
    }
  };

export const deleteSubCategory = (id, openSnackbar) => async (dispatch) => {
  try {
    await api.deleteSubCategory(id);

    dispatch({ type: DELETE_SUBCATEGORY, payload: id });
    openSnackbar("Sub-Category deleted successfully");
  } catch (error) {
    console.log(error);
  }
};
