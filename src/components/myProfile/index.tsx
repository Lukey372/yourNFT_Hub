import { createTheme, Paper, Stack, Tab, Tabs, Box, TextField, Typography } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import ButtonWhite from "src/theme/buttonWhite";
import DropTable from "./table";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ApplyCard from "./applyCard";
import { useDispatch, useSelector } from "react-redux";
import { dropsListSelector, dropsPaginationSelector } from "src/common/selectors";
import StyledTabs from "./styles/styledTabs";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

import { fetchDropsStart } from "src/common/slices/drops.slice";

const Drops = () => {
  const [search, setSearch] = React.useState("");
  const [dropsList, setdropsList] = React.useState({});
  const dispatch = useDispatch();
  const dropCount = useSelector(dropsListSelector)?.count;
  const pagination = useSelector(dropsPaginationSelector);

  return (
    <Fragment>
      <Stack alignItems='center' spacing={3}>
        <Paper
          sx={{
            borderRadius: 10,
            mt: 5,
            pt: 1,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            background: "linear-gradient(180deg, rgb(100 100 100) 0%, rgba(0,0,0,1) 2%)",
          }}>

          <DropTable />
        </Paper>
      </Stack>
    </Fragment>
  );
};

export default Drops;
