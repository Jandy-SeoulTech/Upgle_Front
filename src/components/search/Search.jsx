/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import {
  IconButton,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { useHistory } from 'react-router';
import { ReactComponent as SearchIcon } from '../../lib/assets/searchIcon.svg';
import { ReactComponent as AddIcon } from '../../lib/assets/add.svg';
import { ReactComponent as RemoveIcon } from '../../lib/assets/remove.svg';
import Button from '../common/Button';
import ChannelCard from '../channel/ChannelCard';
import UserCard from '../common/UserCard';
import ArchiveCard from '../common/ArchiveCard';

const fakeChannels = [
  {
    id: 1,
    channelImage: { src: null },
    name: '코딩은 재미있어',
    participants: [1, 2, 3, 4, 5, 6, 7],
    category: { category: { name: '개발' } },
    tags: [
      { tagId: 1, tag: { name: '코딩' } },
      { tagId: 2, tag: { name: '프로그래밍' } },
      { tagId: 3, tag: { name: '프로젝트' } },
    ],
  },
  {
    id: 2,
    channelImage: { src: null },
    name: '코딩은 재미있어',
    participants: [1, 2, 3, 4, 5, 6, 7],
    category: { category: { name: '개발' } },
    tags: [
      { tagId: 1, tag: { name: '코딩' } },
      { tagId: 2, tag: { name: '프로그래밍' } },
      { tagId: 3, tag: { name: '프로젝트' } },
    ],
  },
  {
    id: 3,
    channelImage: { src: null },
    name: '코딩은 재미있어',
    participants: [1, 2, 3, 4, 5, 6, 7],
    category: { category: { name: '개발' } },
    tags: [
      { tagId: 1, tag: { name: '코딩' } },
      { tagId: 2, tag: { name: '프로그래밍' } },
      { tagId: 3, tag: { name: '프로젝트' } },
    ],
  },
  {
    id: 4,
    channelImage: { src: null },
    name: '코딩은 재미있어',
    participants: [1, 2, 3, 4, 5, 6, 7],
    category: { category: { name: '개발' } },
    tags: [
      { tagId: 1, tag: { name: '코딩' } },
      { tagId: 2, tag: { name: '프로그래밍' } },
      { tagId: 3, tag: { name: '프로젝트' } },
    ],
  },
];

const fakeUsers = [
  { id: 1, nickname: 'fakeNick1' },
  { id: 2, nickname: 'fakeNick2' },
  { id: 3, nickname: 'fakeNick3' },
];

const fakeArchives = [
  { id: 1, title: '재능을 가르쳐주세요!', date: '2021.10.10' },
  { id: 2, title: '재능을 가르쳐주세요!', date: '2021.10.10' },
  { id: 3, title: '재능을 가르쳐주세요!', date: '2021.10.10' },
  { id: 4, title: '재능을 가르쳐주세요!', date: '2021.10.10' },
  { id: 5, title: '재능을 가르쳐주세요!', date: '2021.10.10' },
  { id: 6, title: '재능을 가르쳐주세요!', date: '2021.10.10' },
  { id: 7, title: '재능을 가르쳐주세요!', date: '2021.10.10' },
  { id: 8, title: '재능을 가르쳐주세요!', date: '2021.10.10' },
];

const initialCategories = [
  { name: '미술 / 공예', selected: false },
  { name: '디자인', selected: false },
  { name: '음악', selected: false },
  { name: '연기 / 미술', selected: false },
  { name: '댄스', selected: false },
  { name: '사진 / 영상', selected: false },
  { name: '요리 / 조리', selected: false },
  { name: '패션 / 뷰티', selected: false },
  { name: '홈리빙 / 인테리어', selected: false },
  { name: '펫 / 반려동물', selected: false },
  { name: '여행', selected: false },
  { name: '취미 생활', selected: false },
  { name: '외국어', selected: false },
  { name: '프로그래밍', selected: false },
  { name: '시험 / 자격증', selected: false },
  { name: '커리어', selected: false },
  { name: '학문', selected: false },
  { name: '창업', selected: false },
  { name: '투자 / 부업', selected: false },
  { name: '스포츠', selected: false },
  { name: '건강', selected: false },
  { name: '라이프', selected: false },
  { name: '기타', selected: false },
];

const Search = ({ keyword }) => {
  const history = useHistory();
  const [newKeyword, setNewKeyword] = useState(keyword);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [categories, setCategories] = useState(initialCategories);
  const [subMenu, setSubMenu] = useState('channel');

  const onSearch = () => {
    history.push(`/search?keyword=${newKeyword}`);
  };

  const onSearchKeyDown = (e) => {
    if (e.keyCode === 13) onSearch();
  };

  const onCategoriesChanged = (e) => {
    const name = e.target.value;
    toggleCategory(name);
  };

  const toggleCategory = (name) => {
    setCategories(
      categories.map((category) =>
        category.name === name ? { ...category, selected: !category.selected } : category,
      ),
    );
  };

  return (
    <Grid container css={wrapper} flexDirection="column" alignItems="center">
      <Grid item>
        <TextField
          sx={search}
          placeholder="업글에서 공유되고 있는 다양한 재능들을 탐색해보세요!"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small" onClick={onSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={newKeyword}
          onChange={(e) => setNewKeyword(e.target.value)}
          onKeyDown={onSearchKeyDown}
        />
      </Grid>
      <Grid item container css={width1140px} mb={10}>
        <Grid
          item
          container
          css={borderTopBottom}
          alignItems="center"
          pl={5}
          onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
        >
          <Grid item>
            <Typography fontSize="1.125rem" fontWeight="700">
              카테고리
            </Typography>
          </Grid>
          {isCategoriesOpen ? (
            <Grid item width="24px" height="24px" ml={0.6} lineHeight="15px" textAlign="center">
              <RemoveIcon />
            </Grid>
          ) : (
            <Grid item height="24px" ml={0.6} lineHeight="24px">
              <AddIcon />
            </Grid>
          )}
        </Grid>
        <Grid item container bgcolor="#FAFAFC" py={1}>
          {isCategoriesOpen && (
            <Grid item container>
              {categories.map((category) => (
                <Grid key={category.name} item xs={2} pl={5} py={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        css={checkBox}
                        value={category.name}
                        checked={category.selected}
                        onChange={onCategoriesChanged}
                      />
                    }
                    label={<Typography css={checkBoxLabel}>{category.name}</Typography>}
                  />
                </Grid>
              ))}
            </Grid>
          )}
          <Grid item container css={categoriesContainer}>
            {categories
              .filter((category) => category.selected)
              .map((category) => (
                <Grid key={category.name} item>
                  <Typography
                    css={selectedCategory}
                    data-name={category.name}
                    onClick={(e) => toggleCategory(e.target.dataset.name)}
                  >
                    {category.name}
                    <span style={{ fontSize: '12px', marginLeft: '10px', color: 'gray' }}>✕</span>
                  </Typography>
                </Grid>
              ))}
          </Grid>
        </Grid>
        <Grid item container flexDirection="row">
          <Grid
            item
            container
            css={[borderTopBottom, { borderRight: '1px solid #5f5f5f' }]}
            justifyContent="center"
            alignItems="center"
            xs={6}
            onClick={() => {
              setCategories(initialCategories);
            }}
          >
            <Typography fontSize="1.125rem" fontWeight="700" color="#5F5F5F">
              초기화
            </Typography>
          </Grid>
          <Grid
            item
            container
            css={[borderTopBottom]}
            justifyContent="center"
            alignItems="center"
            xs={6}
          >
            <Typography fontSize="1.125rem" fontWeight="700" color="#5F5F5F">
              검색
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container css={width1140px} alignItems="center">
        <Grid item container mb={5} columnGap={5} xs={12} justifyContent="center">
          <Grid item>
            <Button
              className={subMenu === 'channel' && 'selected'}
              css={searchSubButton}
              onClick={() => setSubMenu('channel')}
            >
              재능 공유 채널 ({fakeChannels.length})
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={subMenu === 'user' && 'selected'}
              css={searchSubButton}
              onClick={() => setSubMenu('user')}
            >
              재능 고수 ({fakeUsers.length})
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={subMenu === 'archive' && 'selected'}
              css={searchSubButton}
              onClick={() => setSubMenu('archive')}
            >
              모아 보기 ({fakeArchives.length})
            </Button>
          </Grid>
        </Grid>
        {subMenu === 'channel' && (
          <>
            <Grid item container spacing={2}>
              {fakeChannels.length === 0 ? (
                <Grid item xs={12} css={noContents}>
                  검색된 채널이 없습니다.
                </Grid>
              ) : (
                fakeChannels.map((channel) => (
                  <Grid key={channel.id} item>
                    <ChannelCard channel={channel} />
                  </Grid>
                ))
              )}
            </Grid>
            <Grid item container css={moreButton} justifyContent="center">
              <Typography css={moreButtonText}>더 보기 ▼</Typography>
            </Grid>
          </>
        )}
        {subMenu === 'user' && (
          <>
            <Grid item container spacing={2}>
              {fakeUsers.length === 0 ? (
                <Grid item xs={12} css={noContents}>
                  검색된 유저가 없습니다.
                </Grid>
              ) : (
                fakeUsers.map((user) => (
                  <Grid key={user.id} item xs={12}>
                    <UserCard
                      loggedInUser={{ id: 1, followings: [] }}
                      user={user}
                      onFollow={({ followingId }) => console.log(followingId)}
                      onUnfollow={({ followingId }) => console.log(followingId)}
                    />
                  </Grid>
                ))
              )}
            </Grid>
            <Grid item container css={moreButton} justifyContent="center">
              <Typography css={moreButtonText}>더 보기 ▼</Typography>
            </Grid>
          </>
        )}
        {subMenu === 'archive' && (
          <>
            <Grid item container columns={6} spacing="1.375rem">
              {fakeArchives.length === 0 ? (
                <Grid item xs={12} css={noContents}>
                  검색된 글이 없습니다.
                </Grid>
              ) : (
                fakeArchives.map((archive) => <ArchiveCard key={archive.id} archive={archive} />)
              )}
            </Grid>
            <Grid item container css={moreButton} justifyContent="center">
              <Typography css={moreButtonText}>더 보기 ▼</Typography>
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
};

const wrapper = css`
  margin-top: 3.75rem;
  width: 100vw;
`;

const search = css`
  width: 59.125rem;
  height: 3.25rem;
  margin: 4.375rem auto;

  & .MuiOutlinedInput-root {
    & fieldset {
      border: 2px solid #7b7b7b;
      border-radius: 1.625rem;
    }
    &:hover fieldset {
      border-color: #7b7b7b;
    }
    &.Mui-focused fieldset {
      border-color: #7b7b7b;
    }
  }
`;

const width1140px = css`
  width: 71.25rem;
`;

const borderTopBottom = css`
  border-top: 1px solid #5f5f5f;
  border-bottom: 1px solid #5f5f5f;
  height: 3.75rem;
  cursor: pointer;
`;

const checkBox = css`
  &.Mui-checked {
    color: black;
  }
`;

const checkBoxLabel = css`
  font-size: 0.875rem;
`;

const categoriesContainer = css`
  padding: 2.1875rem 2.5rem;
  column-gap: 1.875rem;
  row-gap: 1.25rem;
`;

const selectedCategory = css`
  background-color: white;
  font-weight: 400;
  font-size: 0.9375rem;
  height: 1.875rem;
  padding: 0.3125rem 0.625rem;
  border-radius: 1.875rem;
  display: flex;
  align-items: center;
  border: 1px solid #7b7b7b;
  cursor: pointer;
`;

const searchSubButton = css`
  height: fit-content;
  font-size: 1.25rem;
  font-weight: 600;
  padding: 0.9375rem 1.4375rem;
  border: none;
  border-radius: 4.0625rem;
  &:hover {
    border: none;
    background-color: #fafafc;
    color: black;
  }
  &.selected {
    background-color: black;
    color: white;
  }
`;

const moreButton = css`
  cursor: pointer;
  margin-top: 1.875rem;
  margin-bottom: 6.25rem;
  padding: 1.5625rem 0.5rem;
`;

const moreButtonText = css`
  font-size: 1.125rem;
  font-weight: 700;
`;

const noContents = css`
  font-family: 'Noto Sans KR', 'sans-serif' !important;
  font-size: 14px;
  color: #5f5f5f;
  text-align: center;
  height: 200px;
  line-height: 200px;
`;

export default Search;
