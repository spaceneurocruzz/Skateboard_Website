import React from "react";
import { withStyles } from "@material-ui/styles";
import { Card, CardActions, CardContent, CardMedia } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    maxWidth: 340,
  },
  media: {
    height: 0,
    //paddingTop: "56.25%",
  },
};

const MapInfoWindow = (props) => {
  const { classes } = props;
  return props.show ? (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Bosphorus.jpg/397px-Bosphorus.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography component="p">
            XX滑板場
            地址：
            開放時間
            電話：
            建議交通方式：
            場地介紹：
            最後修改者：
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            修改
          </Button>
          <Button size="small" color="primary">
            加入最愛
          </Button>
        </CardActions>
      </Card>
    </div>
  ) : null;
};

export default withStyles(styles)(MapInfoWindow);
