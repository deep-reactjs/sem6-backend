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
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  updateProduct,
  uploadProduct,
} from "../../actions/productActions";
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
  const [errors, setErrors] = useState({
    name: null,
    price: null,
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
  console.log(product);
  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    console.log("onclicl");
    if (productData.file) {
      dispatch(
        uploadProduct({
          file: productData.file,
          openSnackbar,
          onSuccess: (data) => {
            if (currentId) {
              dispatch(
                updateProduct(
                  currentId,
                  { ...productData, imgUrl: data.file.path },
                  openSnackbar
                )
              );
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
                    imgUrl: data.file.path,
                    userId: productData.userId,
                  },
                  openSnackbar
                )
              );
            }
          },
        })
      );
    } else {
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
    }

    clear();
    handleClose();
  };

  const clear = () => {
    setCurrentId && setCurrentId(null);
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
    setErrors({
      name: null,
      price: null,
    });
  };

  const handleClose = () => {
    setOpen(false);
    clear();
  };

  const inputStyle = {
    marginTop: "16px",
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
              {productData?.file || productData.imgUrl ? (
                <>
                  <img
                    // src={`data:image/jpeg;base64,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`}
                    src={
                      productData.imgUrl
                        ? new URL(
                            `${process.env.REACT_APP_API}/${productData.imgUrl}`
                          )
                        : URL.createObjectURL(productData?.file)
                    }
                    alt="product"
                    style={{
                      height: "300px",
                      width: "100%",
                      objectFit: "contain",
                    }}
                  />
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() =>
                      setProductData({
                        ...productData,
                        imgUrl: null,
                        file: "",
                      })
                    }
                  >
                    remove
                  </Button>
                </>
              ) : (
                <input
                  placeholder="Name"
                  style={inputStyle}
                  name="file"
                  type="file"
                  accept="image/png, image/jpeg"
                  value={productData?.file}
                  onChange={(e) => {
                    setProductData({ ...productData, file: e.target.files[0] });
                  }}
                />
              )}
              <TextField
                error={errors.name}
                style={inputStyle}
                id="outlined-error-helper-text"
                helperText={errors.name}
                variant="outlined"
                placeholder="Name"
                name="name"
                label="name"
                type="text"
                fullWidth
                required
                value={productData.name}
                onChange={(e) => {
                  if (!e.target.value) {
                    setErrors({ ...errors, name: "Name is required" });
                    setProductData({ ...productData, name: e.target.value });
                  } else if (e.target.value.length > 50) {
                    setErrors({ ...errors, name: "Max 50 characters allowed" });
                  } else {
                    setErrors({ ...errors, name: null });
                    setProductData({ ...productData, name: e.target.value });
                  }
                }}
              />
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedCategory}
                defaultValue={0}
                fullWidth
                required
                variant="outlined"
                onChange={(e) =>
                  e.target.value !== 0 && setSelectedCategory(e.target.value)
                }
                style={{ fontSize: "16px", ...inputStyle }}
              >
                <MenuItem value={0}>Select Category</MenuItem>
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
                  required
                  defaultValue={0}
                  variant="outlined"
                  onChange={(e) =>
                    e.target.value !== 0 &&
                    setSelectedSubCategory(e.target.value)
                  }
                  style={{ fontSize: "16px", ...inputStyle }}
                >
                  <MenuItem value={0}>Select Sub-category</MenuItem>
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
              <TextField
                placeholder="Brand"
                name="brand"
                variant="outlined"
                fullWidth
                style={inputStyle}
                type="text"
                onChange={(e) => {
                  if (e.target.value.length > 50) {
                  } else {
                    setProductData({ ...productData, brand: e.target.value });
                  }
                }}
                value={productData.brand}
              />
              <TextField
                error={errors.price}
                id="outlined-error-helper-text"
                helperText={errors.price}
                variant="outlined"
                placeholder="Price"
                name="price"
                label="Price"
                type="number"
                fullWidth
                required
                style={inputStyle}
                value={productData.price}
                onChange={(e) => {
                  if (!e.target.value) {
                    setErrors({ ...errors, price: "Price is required" });
                    setProductData({ ...productData, price: e.target.value });
                  } else if (e.target.value.length > 10) {
                    setErrors({ ...errors, price: "Max 10 numbers allowed" });
                  } else {
                    setErrors({ ...errors, price: null });
                    setProductData({ ...productData, price: e.target.value });
                  }
                }}
              />
              <TextField
                placeholder="Quantity"
                name="quantity"
                variant="outlined"
                fullWidth
                type="number"
                style={inputStyle}
                onChange={(e) => {
                  setProductData({ ...productData, quantity: e.target.value });
                }}
                value={productData.quantity}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleSubmitProduct}
              variant="contained"
              // disabled={
              //   !productData.name ||
              //   !productData.price ||
              //   errors.name ||
              //   errors.price ||
              //   !selectedCategory ||
              //   !selectedSubCategory
              // }
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
