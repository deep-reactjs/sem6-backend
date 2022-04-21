/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import ChipInput from "material-ui-chip-input";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";

import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

import { useDispatch, useSelector } from "react-redux";
import { createCategory, updateCategory } from "../../actions/categoryActions";
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
const chipRenderer = ({ chip, className, handleClick, handleDelete }, key) => (
  <Chip
    className={className}
    key={key}
    label={chip}
    onClick={handleClick}
    // onDelete={handleDelete}
    size="small"
  />
);

const defaultValue = ["Material UI", "Chips"];
const AddCategory = ({ setOpen, open, currentId, setCurrentId }) => {
  const location = useLocation();
  const [categoryData, setCategoryData] = useState({
    name: "",
  });
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const category = useSelector((state) =>
    currentId
      ? state.categories.categories.find((c) => c.category._id === currentId)
          .category
      : null
  );
  const subCategories = useSelector((state) =>
    currentId
      ? state.categories.categories.find((c) => c.category._id === currentId)
          .subCategories
      : null
  );
  const state = useSelector((state) => state);
  // eslint-disable-next-line
  const [openSnackbar, closeSnackbar] = useSnackbar();
  const [errorText, setErrorText] = useState(null);
  useEffect(() => {
    if (category) {
      setCategoryData(category);
    }
  }, [category]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
    // setClientData({...clientData, userId: user?.result?._id})
  }, [location]);

  useEffect(() => {
    var checkId = user?.result?._id;
    if (checkId !== undefined) {
      setCategoryData({ ...categoryData, userId: [checkId] });
    } else {
      setCategoryData({ ...categoryData, userId: [user?.result?.googleId] });
    }
  }, [location]);

  const handleSubmitCategory = (e) => {
    e.preventDefault();
    if (!categoryData.name) {
      setErrorText("Please enter category name");
    } else if (categoryData.name.length > 50) {
      setErrorText("Max 50 characters allowed");
    } else {
      if (currentId) {
        dispatch(updateCategory(currentId, categoryData, openSnackbar));
      } else {
        dispatch(createCategory(categoryData, openSnackbar));
      }
      clear();
      handleClose();
    }
  };

  const clear = () => {
    setCurrentId && setCurrentId(null);
    setCategoryData({
      name: "",
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const inputStyle = {
    display: "block",
    padding: "1.4rem 0.75rem",
    width: "100%",
    fontSize: "1rem",
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
            {currentId ? "Edit Category Details" : "Add new Category"}
          </DialogTitle>
          <DialogContent dividers>
            <div className="customInputs">
              <input
                placeholder="Name"
                style={inputStyle}
                name="name"
                type="text"
                onChange={(e) => {
                  if (e.target.value.length > 50) {
                    setErrorText("Max 50 characters allowed");
                  } else {
                    setErrorText(null);
                    setCategoryData({ ...categoryData, name: e.target.value });
                  }
                }}
                value={categoryData.name}
              />
              {currentId && (
                <ChipInput
                  chipRenderer={chipRenderer}
                  style={{
                    color: "#55595c",
                    backgroundColor: "#fff",
                    width: "100%",
                  }}
                  readOnly
                  disabled
                  defaultValue={
                    (subCategories && subCategories.map((data) => data.name)) ||
                    []
                  }
                  label="Sub Categories"
                />
              )}
            </div>
            {errorText && <Typography color="error">{errorText}</Typography>}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleSubmitCategory}
              variant="contained"
              style={{ marginRight: "25px" }}
            >
              Save Category
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
};

export default AddCategory;
