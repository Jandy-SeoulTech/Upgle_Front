/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { Container, TextField } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { memo } from "react";
import PersonIcon from "@material-ui/icons/Person";

const sections = [
  { title: "Posts", url: "#" },
  { title: "Events", url: "#" },
  { title: "Community", url: "#" },
  { title: "FAQ", url: "#" },
  { title: "About", url: "#" },
];

const Header = () => {
  const history = useHistory();

  return (
    <div
      css={{
        width: "100%",
        boxShadow: "0px 5px 11px 0px #E5E5E5",
        marginBottom: "1rem",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ alignItems: "center" }}>
          <TextField label="검색" size="small" sx={{ flex: 1 }} />
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              history.push("/mypage");
            }}
          >
            <PersonIcon />
          </IconButton>
          {false ? (
            <Button
              color="inherit"
              variant="outlined"
              size="small"
              sx={{ textDecoration: "none" }}
            >
              SIGN OUT
            </Button>
          ) : (
            <Link to="/signin">
              <Button
                variant="outlined"
                size="small"
                sx={{ textDecoration: "none" }}
              >
                Sign In
              </Button>
            </Link>
          )}
        </Toolbar>
        <Toolbar
          component="nav"
          variant="dense"
          sx={{ justifyContent: "space-between", overflowX: "auto" }}
        >
          {sections.map((section) => (
            <Link
              to={`/${section.url}`}
              key={section.title}
              style={{
                flex: 1,
                height: "3rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              {section.title}
            </Link>
          ))}
        </Toolbar>
      </Container>
    </div>
  );
};

export default memo(Header);
