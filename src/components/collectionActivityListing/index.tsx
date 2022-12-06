import { createTheme, Paper, Stack, Tab, Tabs, Box, TextField, Typography, Backdrop, CircularProgress } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import ButtonWhite from "src/theme/buttonWhite";
import DropTable from "./table";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ApplyCard from "./applyCard";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { dropsListSelector, dropsPaginationSelector } from "src/common/selectors";
import { MARKETPLACES_API } from "src/common/config";
import commonService from "src/common/services/common.service";
import StyledTabs from "./styles/styledTabs";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

import { fetchDropsStart } from "src/common/slices/drops.slice";

const ActivityListing = () => {
  const [search, setSearch] = React.useState("");
  const [dropsList, setdropsList] = React.useState({});
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const dropCount = useSelector(dropsListSelector)?.count;
  const pagination = useSelector(dropsPaginationSelector);
  const router = useRouter();
  const { collection } = router.query;

  const [data, setData] = useState<any>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      let result: any;
      result = await commonService({
        method: "get",
        route: `${MARKETPLACES_API.GET_ACTIVITY_COLLECTION}?symbol=${collection}`
      });
      setData([...result.rows]);
      setLoading(false);
    })();
  }, [collection]);


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
            background: "linear-gradient(180deg, #3F3F46 0%, #000000 2%)",
          }}>
          <DropTable data={data} />
        </Paper>
      </Stack>

      {
        loading && (
          <Backdrop
            sx={{ color: "Grey", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" sx={{
              width: `80px`,
              height: `80px`
            }} />
            &nbsp; Loading...
          </Backdrop>
        )
      }
    </Fragment>
  );
};

export default ActivityListing;
