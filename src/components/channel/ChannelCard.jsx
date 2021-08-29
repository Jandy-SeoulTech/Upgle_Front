/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Avatar, Box, Grid, Paper, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { ReactComponent as Participants } from '../../lib/assets/participants.svg';

const ChannelCard = ({ channel }) => {
  const history = useHistory();

  const handleMoveChannel = () => {
    history.push(`/channelProfile/${channel.id}`);
  };

  return (
    <Grid
      container
      component={Paper}
      css={ChannelCardWrapper}
      onClick={handleMoveChannel}
    >
      <Grid item container xs={6} css={leftContent}>
        <Avatar css={channelIcon}></Avatar>
      </Grid>
      <Grid item xs={6} css={rightContent}>
        <Typography css={title}>{channel.name}</Typography>
        <Typography css={total}>
          <Participants css={icon} /> {channel.participants.length}
        </Typography>
        <Typography css={category}>{channel.category.category.name}</Typography>
        <Box css={tagList}>
          {channel.tags.map((tag) => (
            <Typography key={tag.tagId}>#{tag.tag.name}</Typography>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

const ChannelCardWrapper = css`
  width: 22.75rem;
  height: 9.375rem;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.5);
  }
`;

const leftContent = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const channelIcon = css`
  width: 6.25rem;
  height: 6.25rem;
`;

const rightContent = css`
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const title = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-size: 0.875rem;
  font-weight: 600;
`;

const total = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-size: 0.625rem;
  font-weight: 500;
  color: #7b7b7b;
  display: flex;
  align-items: center;
`;

const icon = css`
  margin-right: 0.5rem;
`;

const category = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-size: 0.625rem;
  font-weight: 500;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 0.125rem 0.3125rem;
`;

const tagList = css`
  display: flex;
  .MuiTypography-root {
    font-family: 'Barlow', 'Noto Sans KR';
    font-size: 0.625rem;
    font-weight: 500;
    margin-right: 0.2rem;
  }
`;

export default ChannelCard;
