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
  const [isUpcoming, setUpcoming] = React.useState("1");
  const [search, setSearch] = React.useState("");
  const [dropsList, setdropsList] = React.useState({});
  const dispatch = useDispatch();
  const dropCount = useSelector(dropsListSelector)?.count;
  const pagination = useSelector(dropsPaginationSelector);

  //Rowperpage
  const rpp = "10";

  const handleTabChange = (event, newValue) => {
    // setdropsList({});
    setUpcoming(newValue);
  };

  const dropsListraw = useSelector(dropsListSelector);

  // function to handle search.
  const handleChange = e => {
    setSearch(e.target.value);
    dispatch(
      fetchDropsStart({
        ...pagination,
        // group_by: "date",
        // type: isUpcoming === "1" ? "upcoming" : "launched",
        title: e.target.value,
        // row_per_page: rpp,
        page_num: 1,
      })
    );
  };

  // Function to concat old and new list
  // useEffect(() => {
  //   const temp = Object.keys(dropsListraw).reduce(
  //     getReducer(dropsListraw),
  //     dropsList
  //   );
  //   setdropsList(temp);
  // }, [dropsListraw, dropsList]);


  const handleLoadmore = e => {
    dispatch(
      fetchDropsStart({
        ...pagination,
        page_num: pagination.page_num + 1,
      })
    );
  };

  //Effect to load list on start and on tab change

  useEffect(() => {
    dispatch(
      fetchDropsStart({
        row_per_page: rpp,
        group_by: "date",
        type: isUpcoming === "1" ? "upcoming" : "launched",
        sort_type: isUpcoming === "1" ? "ASC" : "DESC",
        page_num: 1,
        order_by: "launch_date",
      })
    );
    setSearch("");
  }, [isUpcoming]);
  return (
    <Fragment>
      <Stack alignItems='center' spacing={3}>
        <StyledTabs
          value={isUpcoming}
          onChange={handleTabChange}
          centered
          textColor='text.primary'
          sx={{ width: "100%" }}>
          <Tab label='Upcoming' value='1' />
          <Tab label='Launched' value='0' />
        </StyledTabs>
        <TextField
          placeholder='Enter Project Name'
          name='search'
          onChange={handleChange}
          value={search}
          sx={{
            bgcolor: "grey.900",
            width: { md: "40%", xs: "90%" },
            color: "grey",
          }}
          InputProps={{
            type: "search",
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
          }}
        />
        <Typography color='text.secondary' component='div'>
          Total Projects: {dropCount}
        </Typography>
        <Paper
          sx={{
            borderRadius: 10,
            mt: 5,
            pt: 1,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            background: "linear-gradient(180deg, rgb(100 100 100) 0%, rgba(0,0,0,1) 8%)",
          }}>
          {/* <Typography variant="h5" textAlign="center" color="grey.500">
            January 1st dum
          </Typography> */}

          <DropTable />
          {(dropCount / 10) > pagination.page_num ? (
            <ButtonWhite sx={{ textTransform: "capitalize", mx: "auto" }} onClick={handleLoadmore}>
              Load more
            </ButtonWhite>
          ) : (
            <Typography color='text.secondary' align='center'>
              End of List
            </Typography>
          )}
        </Paper>
        <Box sx={{ height: "5vh" }} />
        <ApplyCard sx={{ width: "100%" }} />
      </Stack>
    </Fragment>
  );
};

export default Drops;
