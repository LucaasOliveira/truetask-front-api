import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import TaskIcon from "@mui/icons-material/Task";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { ColorModeContext } from "../../App";
import { doLogin } from "../../store/modules/LoginSlice";
import { useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ModalLogout from "../ModalLogout/ModalLogout";

const settings = ["Sair"];

function Header() {
  const colorMode = React.useContext(ColorModeContext);
  const [auth, setAuth] = React.useState(true);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
    colorMode.toggleColorMode();
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenModal = () => {
    setOpenConfirmModal(true);
  };

  const handleConfirmModal = () => {
    dispatch(doLogin());
    navigate("/");
    setAnchorElUser(null);
    setOpenConfirmModal(false);
  };

  const handleConfirmClose = () => {
    setOpenConfirmModal(false);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#ab47bc" }}>
        <Container maxWidth="xl">
          <Toolbar
            sx={{ display: "flex", justifyContent: "space-between" }}
            disableGutters
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "background.default"
              }}
            >
              <TaskIcon sx={{ display: { xs: "none", md: "flex" }, mr: 2.5 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 3,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "Cutive Mono",
                  fontWeight: 900,
                  letterSpacing: ".4rem",
                  color: "inherit",
                  textDecoration: "none"
                }}
              >
                TrueTask
              </Typography>

              <TaskIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "Cutive Mono",

                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none"
                }}
              >
                TrueTask
              </Typography>
            </Box>

            <Box>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, color: "background.default" }}
                >
                  <ManageAccountsIcon />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "50px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <FormGroup
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "background.default"
                  }}
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={auth}
                        onChange={handleChange}
                        aria-label="login switch"
                      />
                    }
                    label=""
                    sx={{
                      backgroundColor: "background.default",
                      margin: "0px"
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.primary",
                      width: "100px",
                      maxWidth: "100%"
                    }}
                  >
                    {auth ? "Light" : "Dark"}
                  </Typography>
                </FormGroup>
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleOpenModal}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
              <ModalLogout
                handleConfirmClose={handleConfirmClose}
                handleConfirmModal={handleConfirmModal}
                isOpen={openConfirmModal}
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default Header;
