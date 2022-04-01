/* eslint-disable */
import React, { useState, useEffect } from "react";
import Products from "./Products";
import AddProduct from "./AddProduct";
import { getProductsByUser } from "../../actions/productActions";
import { getCategoriesByUser } from "../../actions/categoryActions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import NoData from "../svgIcons/NoData";
import Spinner from "../Spinner/Spinner";

const ProductList = () => {
  const history = useHistory();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const { products } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const isLoading = useSelector((state) => state?.products?.isLoading);
  // const clients = []

  // useEffect(() => {
  // }, [currentId, dispatch]);

  //     useEffect(() => {
  //         dispatch(getClients(1));
  //         // dispatch(getClientsByUser({userId : user?.result?._id}));
  //         // dispatch(getClientsByUser({ search :user?.result?._id, tags: tags.join(',') }));
  //     },[location]
  // )

  useEffect(() => {
    dispatch(
      getProductsByUser({ search: user?.result?._id || user.result.googleId })
    );
  }, [location, dispatch]);
  useEffect(() => {
    if (categories && categories.length <= 0)
      dispatch(
        getCategoriesByUser({
          search: user?.result?._id || user.result.googleId,
        })
      );
  }, [categories]);
  if (!user) {
    history.push("/login");
  }

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          paddingTop: "20px",
        }}
      >
        <Spinner />
      </div>
    );
  }

  if (products?.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          paddingTop: "20px",
          margin: "80px",
        }}
      >
        <NoData />
        <p style={{ padding: "40px", color: "gray", textAlign: "center" }}>
          No Products yet. Click the plus icon to add Product
        </p>
      </div>
    );
  }

  return (
    <div>
      <AddProduct
        open={open}
        setOpen={setOpen}
        currentId={currentId}
        setCurrentId={setCurrentId}
      />
      <Products
        open={open}
        setOpen={setOpen}
        currentId={currentId}
        setCurrentId={setCurrentId}
        products={products}
        categories={categories}
      />
    </div>
  );
};

export default ProductList;
