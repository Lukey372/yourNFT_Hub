import { Paper, Typography } from "@mui/material";
import React, { Fragment } from "react";
import ButtonWhite from "src/theme/buttonWhite";
import DropTable from "./table";

const Drops = () => {
  return (
    <Fragment>
      <Paper
        sx={{
          borderRadius: 10,
          mt: 5,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h3" textAlign="center">
          Drops Upcoming
        </Typography>
        <DropTable />
        <ButtonWhite sx={{ textTransform: "capitalize", mx: "auto" }}>
          Explore
        </ButtonWhite>
      </Paper>
    </Fragment>
  );
};

export default Drops;
