import { Backdrop, Box, Button, CircularProgress, Paper, Skeleton, Stack, Typography } from "@mui/material";
import React from "react";
import NewsNavButton from "../newsNavButton";
import getDate from "src/common/utils/dateFormater";
import { useSelector } from "react-redux";
import { newsLoadingSelector, singleNewsSelector } from "src/common/selectors";
import { htmlParser } from "src/common/utils/htmlParser";
import parse from "html-react-parser";
import moment from "moment";

import { getSlug } from "../../../helper/generateSlug";
import { handleImageError } from "src/common/utils/handleImageError";
import SeoHeader from "src/components/seoHeader";

const NewsDetail = () => {
  //Styles
  const hFlxSpcbetween = {
    display: "flex",
    justifyContent: "space-between",
  };
  const subtitle1 = {
    fontsize: "1rem",
    textTransform: "uppercase",
  };
  const parent = {
    "& p": {
      color: "text.secondary",
    },
  };

  //main start
  const singleNews = useSelector(singleNewsSelector);
  const loading = useSelector(newsLoadingSelector);

  const { current, next, previous } = singleNews;

  const body = current?.description || "";
  return (
    <>
      <SeoHeader
        title={current?.title}
        description={current?.short_description}
        keywords={current?.keywords}
        image={current?.image}
        date={current?.created_at}
        website={"http://www.yournfthub.com/"}
        type='news'
      />
      <Stack spacing={2} sx={{}}>
        <Paper sx={{ overflow: "hidden" }}>
          <img
            src={current?.image}
            alt=''
            width='100%'
            onError={handleImageError}
            style={{ objectFit: "cover", maxHeight: 450 }}
          />
        </Paper>
        <Typography variant='h5'>{current?.title}</Typography>
        <Box sx={{ ...hFlxSpcbetween }}>
          <Typography variant='body1' sx={subtitle1}>
            By {current?.author}
          </Typography>
          <Typography variant='body1' sx={subtitle1}>
            {moment(current?.created_at).utc().format("MMMM DD, YYYY")}
          </Typography>
        </Box>
        <Typography variant='body1' component='div' color='text.secondary'>
          {parse(body)}
        </Typography>

        {!current?.description && <Skeleton height='15vh'></Skeleton>}

        {/* <Typography variant="body2" component="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna ligula
          enim interdum blandit ornare praesent sollicitudin id. Nunc placerat
          ultrices fermentum porttitor feugiat pharetra sapien, enim. Eget
          mattis feugiat erat tellus. Dictumst ac duis porttitor tellus ut
          lacus, mi pellentesque sed. Lorem sit lacus adipiscing pulvinar vitae
          ultricies nibh nec. Nec erat ullamcorper pretium arcu mattis vitae
          tristique magnis tincidunt. Ac in orci turpis facilisi a habitasse
          malesuada tempor. Tristique nisi porta odio interdum cras tincidunt.
          Ullamcorper elementum auctor pellentesque malesuada sed porttitor.
          Purus et, risus odio nunc. Sed a amet diam eget amet, in. Quis tempor
          pellentesque ut vitae, vulputate nunc convallis est vitae. Morbi
          sollicitudin convallis mi ornare sed sit iaculis arcu erat. Non fames
          tincidunt faucibus venenatis, nullam. Tellus molestie gravida quam
          parturient tortor lobortis vel nullam. Volutpat sed quis ut facilisis
          cras viverra lectus malesuada. Sem augue malesuada et duis nunc
          fermentum nisi, lacus. Quam ac at vel tellus, tempus proin aliquam
          praesent. Urna erat amet amet dolor leo diam.
        </Typography>
        
        <Typography variant="body2" component="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus
          facilisi nibh justo, ac, sit nulla dictum bibendum nullam. Sed
          vestibulum integer enim nec viverra. Turpis morbi erat est imperdiet.
          At diam diam ut sed urna. Erat amet, quisque mollis elementum.
          Interdum tortor, nunc ac quam dictum. Nisi, fermentum sagittis quam
          nam neque, curabitur in blandit sed. Amet arcu non etiam dictum nullam
          erat eu. Feugiat cursus sit sit penatibus erat porttitor. Ultrices
          pulvinar pharetra malesuada tristique nunc consequat venenatis. Eros,
          quis sed eget tellus vitae nibh. Donec natoque enim facilisis interdum
          cras faucibus in. Diam mauris penatibus risus, ut arcu pretium tempor.
          Nunc, non dui proin aliquet. Lacus elit turpis urna risus id egestas
          senectus mattis. Nec sagittis fames cursus nunc tristique quam nec
          nullam quam. Cursus orci lorem vestibulum in dignissim mattis risus
          duis. Dignissim urna venenatis diam vestibulum phasellus eget
          tincidunt. Lorem leo amet quis at semper. Quisque tincidunt sit risus
          mi consequat, tellus tellus. Molestie tincidunt orci quis enim, risus
          eros nibh et id. Lorem ut adipiscing laoreet in. Mi vitae imperdiet
          sit donec porttitor in justo. At eu quam ullamcorper lobortis enim
          fermentum facilisis duis. Faucibus posuere orci sed sed venenatis
          libero. Ut leo in quis et massa aliquam in luctus. Donec sed iaculis
          eu diam vitae hendrerit sagittis convallis turpis. Massa adipiscing
          aliquam turpis diam. Malesuada ac nisi sit et neque, suspendisse
          magna. Augue odio vestibulum nulla commodo at ullamcorper viverra.
          Amet nisl erat commodo blandit euismod mauris ornare venenatis,
          vulputate. Iaculis augue aenean egestas lacus, sollicitudin eu
          accumsan turpis. Potenti nunc tellus nisl lectus amet. Augue dignissim
          nulla odio lectus. Enim at pellentesque quam ut pharetra. Egestas
          ornare eu sit viverra suspendisse lorem ut. Arcu nibh sit nibh gravida
          ornare ipsum. Adipiscing vel nibh hac adipiscing. Nunc, ultrices vitae
          fermentum sapien in nisl, accumsan. Viverra fermentum laoreet maecenas
          odio elementum faucibus. Ipsum, vulputate amet, orci sollicitudin
          pharetra. Nisi eget purus ante netus nunc tortor morbi tincidunt. Nunc
          turpis vitae morbi mauris lectus in suspendisse pellentesque
          adipiscing. Mauris turpis turpis ac risus. Nullam bibendum consectetur
          duis lectus diam. Mattis diam, sed enim fringilla a odio. Semper
          euismod quam aenean molestie orci arcu. Nunc sit aliquet amet nunc,
          dictum pharetra interdum quam bibendum. Felis interdum egestas
          vestibulum varius vitae malesuada ut tempor mattis.
        </Typography>
        <Typography variant="body2" component="p">
          NFTs are much easier to understand than most people think. This guide
          aims to demystify NFTs and give you a basic understanding of what they
          are, what they do, and most importantly, why they matter.
        </Typography> */}
        <Box sx={hFlxSpcbetween}>
          <NewsNavButton
            href={`/news/${previous?.id}/${getSlug(previous?.title)}`}
            title='Previous'
            body={previous?.title}
            sx={{ width: "48%" }}
            disabled={!previous}
          />
          <NewsNavButton
            href={`/news/${next?.id}/${getSlug(next?.title)}`}
            title='Next'
            body={next?.title}
            sx={{ width: "48%" }}
            disabled={!next}
          />
        </Box>
      </Stack>
      {loading && (
        <Backdrop sx={{ color: "Grey", zIndex: theme => theme.zIndex.drawer + 1 }} open={true}>
          <CircularProgress color='inherit' sx={{
            width: `80px`,
            height: `80px`
          }} />
          &nbsp; Loading...
        </Backdrop>
      )}
    </>
  );
};

export default NewsDetail;
