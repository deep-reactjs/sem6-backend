/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, updateProduct } from "../../actions/productActions";
import { useSnackbar } from "react-simple-snackbar";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: "#1976D2",
    marginLeft: 0,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "white",
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const AddProduct = ({ setOpen, open, currentId, setCurrentId }) => {
  const location = useLocation();
  const [productData, setProductData] = useState({
    name: "",
    quantity: "",
    brand: "",
    price: "",
    userId: "",
  });
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSubCategory, setSelectedSubCategory] = useState();
  const dispatch = useDispatch();
  const { product, categories } = useSelector((state) => ({
    product: currentId
      ? state.products.products.find((c) => c._id === currentId)
      : null,
    categories: state.categories.categories,
  }));
  // eslint-disable-next-line
  const [openSnackbar, closeSnackbar] = useSnackbar();

  useEffect(() => {
    if (product) {
      setProductData(product);
      setSelectedCategory(product.category);
      setSelectedSubCategory(product.subCategory);
    }
  }, [product]);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
    // setClientData({...clientData, userId: user?.result?._id})
  }, [location]);

  useEffect(() => {
    var checkId = user?.result?._id;
    if (checkId !== undefined) {
      setProductData({ ...productData, userId: [checkId] });
    } else {
      setProductData({ ...productData, userId: [user?.result?.googleId] });
    }
  }, [location]);

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updateProduct(currentId, productData, openSnackbar));
    } else {
      dispatch(
        createProduct(
          {
            name: productData.name,
            category: selectedCategory,
            subCategory: selectedSubCategory,
            quantity: productData.quantity,
            brand: productData.brand,
            price: productData.price,
            imgUrl: "",
            userId: productData.userId,
          },
          openSnackbar
        )
      );
    }

    clear();
    handleClose();
  };

  const clear = () => {
    setCurrentId(null);
    setProductData({
      name: "",
      quantity: "",
      brand: "",
      price: "",
      userId: "",
      file: "",
    });
    setSelectedCategory();
    setSelectedSubCategory();
  };

  const handleClose = () => {
    setOpen(false);
    clear();
  };

  const inputStyle = {
    display: "block",
    padding: "1.4rem 0.75rem",
    width: "100%",
    fontSize: "16px",
    lineHeight: 1.25,
    color: "#55595c",
    backgroundColor: "#fff",
    backgroundImage: "none",
    backgroundClip: "padding-box",
    borderTop: "0",
    borderRight: "0",
    borderBottom: "1px solid #eee",
    borderLeft: "0",
    borderRadius: "3px",
    transition: "all 0.25s cubic-bezier(0.4, 0, 1, 1)",
  };

  return (
    <div>
      <form>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          fullWidth
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
            style={{ paddingLeft: "20px", color: "white" }}
          >
            {currentId ? "Edit Product Details" : "Add new Product"}
          </DialogTitle>
          <DialogContent dividers>
            <div className="customInputs">
              {productData?.file ? (
                <img
                  src={URL.createObjectURL(productData?.file)}
                  alt="product"
                  style={{
                    height: "300px",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <input
                  placeholder="Name"
                  style={inputStyle}
                  name="file"
                  type="file"
                  onChange={(e) => {
                    setProductData({ ...productData, file: e.target.files[0] });
                  }}
                />
              )}
              <input
                placeholder="Name"
                style={inputStyle}
                name="name"
                label="name"
                type="text"
                onChange={(e) =>
                  setProductData({ ...productData, name: e.target.value })
                }
                value={productData.name}
              />
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedCategory}
                fullWidth
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{ fontSize: "16px", padding: "12px" }}
              >
                {categories &&
                  categories?.map(({ category }, id) => (
                    <MenuItem key={id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
              </Select>
              {selectedCategory &&
              categories?.find(
                ({ category }) => category._id === selectedCategory
              )?.subCategories?.length > 0 ? (
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedSubCategory}
                  fullWidth
                  onChange={(e) => setSelectedSubCategory(e.target.value)}
                  style={{ fontSize: "16px", padding: "12px" }}
                >
                  {categories
                    ?.find(({ category }) => category._id === selectedCategory)
                    ?.subCategories?.map((subCategory, id) => (
                      <MenuItem key={id} value={subCategory._id}>
                        {subCategory.name}
                      </MenuItem>
                    ))}
                </Select>
              ) : (
                ""
              )}
              <input
                placeholder="Brand"
                style={inputStyle}
                name="brand"
                type="text"
                onChange={(e) =>
                  setProductData({ ...productData, brand: e.target.value })
                }
                value={productData.brand}
              />

              <input
                placeholder="Price"
                style={inputStyle}
                name="price"
                type="text"
                onChange={(e) =>
                  setProductData({ ...productData, price: e.target.value })
                }
                value={productData.price}
              />

              <input
                placeholder="Quantity"
                style={inputStyle}
                name="quantity"
                type="text"
                onChange={(e) =>
                  setProductData({ ...productData, quantity: e.target.value })
                }
                value={productData.quantity}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleSubmitProduct}
              variant="contained"
              style={{ marginRight: "25px" }}
            >
              Save Product
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
};

export default AddProduct;
