/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Avatar, Button, Grid, Typography } from '@material-ui/core';
import { ReactComponent as ReviewGood } from '../../lib/assets/reviewGood.svg';
import { ReactComponent as ReviewSoso } from '../../lib/assets/reviewSoso.svg';
import { ReactComponent as ReviewBad } from '../../lib/assets/reviewBad.svg';

function ModalReviewCard({ review }) {
  return (
    <Grid container py={4} px={4} rowGap={2} borderBottom="1px solid #E0E0E0">
      <Grid item container xs={12} justifyContent="space-between" alignItems="center">
        <Grid item container alignItems="center" width="fit-content">
          {review.status === 'good' && <ReviewGood></ReviewGood>}
          {review.status === 'soso' && <ReviewSoso></ReviewSoso>}
          {review.status === 'bad' && <ReviewBad></ReviewBad>}
          <Typography ml={2} css={{ fontSize: '10px', height: 'fit-content' }}>
            {review.createdAt.substr(0, 10).replaceAll('-', '.')}
          </Typography>
        </Grid>
        <Grid item container width="fit-content">
          <Button
            variant="outlined"
            css={channelButton}
            onClick={() => (window.location.href = `/channel/${review.channelId}/home`)}
          >
            <Avatar
              src={review.reviewChannel.channelImage}
              css={{
                width: '26.25px',
                height: '26.25px',
                marginRight: '7.5px',
              }}
            />
            <Typography css={channelName}>{review.reviewChannel.name}</Typography>
          </Button>
        </Grid>
      </Grid>
      <Grid item container xs={12}>
        <Typography fontSize="14px">{review.content}</Typography>
      </Grid>
    </Grid>
  );
}

const channelButton = css`
  width: fit-content;
  height: 36px;
  border-radius: 36px;
  border-color: #e0e0e0;
  background-color: white;
  padding: auto 10px;
  &:hover {
    border-color: black;
  }
`;

const channelName = css`
  font-family: 'Barlow', 'Noto Sans KR', 'sans-serif' !important;
  font-size: 10px;
  color: black;
`;

export default ModalReviewCard;
