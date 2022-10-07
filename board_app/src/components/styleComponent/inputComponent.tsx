import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export const CustomizedInputBase = () => {
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        width: 300,
        height: 60,
        borderBottom: "solid 1px black",
      }}
    >
      <InputBase sx={{ ml: 1, flex: 1 }} />
      <IconButton
        type="button"
        style={{ paddingTop: "24px" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Box>
  );
};
