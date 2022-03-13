/* eslint-disable */
import React, { useState, useEffect } from "react";
import Categories from "./Categories";
import AddCategory from "./AddCategory";
// import AddSubCategory from "./AddSubCategory";
import { getCategoriesByUser } from "../../actions/categoryActions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import NoData from "../svgIcons/NoData";
import Spinner from "../Spinner/Spinner";

const CategoryList = () => {
  const history = useHistory();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [openSubCategory, setOpenSubCategory] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const { categories } = useSelector((state) => state.categories);
  const isLoading = useSelector((state) => state?.categories?.isLoading);
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
      getCategoriesByUser({ search: user?.result?._id || user.result.googleId })
    );
  }, [location, dispatch]);
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

  if (categories?.length === 0) {
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
          No Categories yet. Click the plus icon to add Category
        </p>
      </div>
    );
  }

  return (
    <div>
      <AddCategory
        open={open}
        setOpen={setOpen}
        currentId={currentId}
        setCurrentId={setCurrentId}
      />
      {/* <AddSubCategory open={openSubCategory} setOpen={setOpenSubCategory} /> */}
      <Categories
        open={open}
        setOpen={setOpen}
        currentId={currentId}
        setCurrentId={setCurrentId}
        categories={categories}
      />
    </div>
  );
};

export default CategoryList;
