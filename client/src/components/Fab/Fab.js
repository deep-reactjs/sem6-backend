import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import AddIcon from "@material-ui/icons/Add";
import CreateIcon from "@material-ui/icons/Create";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CategoryIcon from "@material-ui/icons/Category";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import AddClient from "../Invoice/AddClient";
import AddCategory from "../Categories/AddCategory";
import AddProduct from "../Products/AddProduct";
const FabButton = () => {
  const location = useLocation();
  const mainButtonStyles = { backgroundColor: "#1976D2" };
  const [open, setOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  // if(location.pathname === '/invoice') return null

  return (
    <div>
      <AddClient setOpen={setOpen} open={open} />
      <AddCategory open={openCategory} setOpen={setOpenCategory} />
      <AddProduct open={openProduct} setOpen={setOpenProduct} />
      <Fab
        mainButtonStyles={mainButtonStyles}
        icon={<AddIcon />}
        alwaysShowTitle={true}
      >
        {location.pathname !== "/invoice" && (
          <Action
            text="New Invoice"
            onClick={() => (window.location.href = "/invoice")}
          >
            <CreateIcon />
          </Action>
        )}

        <Action text="New Customer" onClick={() => setOpen((prev) => !prev)}>
          <PersonAddIcon />
        </Action>
        <Action text="New Category" onClick={() => setOpenCategory(true)}>
          <CategoryIcon />
        </Action>
        <Action text="New Product" onClick={() => setOpenProduct(true)}>
          <AddShoppingCartIcon />
        </Action>
      </Fab>
    </div>
  );
};

export default FabButton;
