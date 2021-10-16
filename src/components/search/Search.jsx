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

const initialCategories = [
  { name: '미술 / 공예', selected: false, code: 'ART' },
  { name: '디자인', selected: false, code: 'DESIGN' },
  { name: '음악', selected: false, code: 'MUSIC' },
  { name: '연기 / 미술', selected: false, code: 'ACT' },
  { name: '댄스', selected: false, code: 'DANCE' },
  { name: '사진 / 영상', selected: false, code: 'MEDIA' },
  { name: '요리 / 조리', selected: false, code: 'COOK' },
  { name: '패션 / 뷰티', selected: false, code: 'BEAUTY' },
  { name: '홈리빙 / 인테리어', selected: false, code: 'INTERIOR' },
  { name: '펫 / 반려동물', selected: false, code: 'PET' },
  { name: '여행', selected: false, code: 'TRAVEL' },
  { name: '취미 생활', selected: false, code: 'HOBBY' },
  { name: '외국어', selected: false, code: 'LANGUAGE' },
  { name: '프로그래밍', selected: false, code: 'PROGRAMMING' },
  { name: '시험 / 자격증', selected: false, code: 'EXAM' },
  { name: '커리어', selected: false, code: 'CAREER' },
  { name: '학문', selected: false, code: 'STUDY' },
  { name: '창업', selected: false, code: 'STARTUP' },
  { name: '투자 / 부업', selected: false, code: 'INVEST' },
  { name: '스포츠', selected: false, code: 'SPORTS' },
  { name: '건강', selected: false, code: 'HEALTH' },
  { name: '라이프', selected: false, code: 'LIFE' },
  { name: '기타', selected: false, code: 'ETC' },
];

const Search = ({
  keyword,
  code,
  onChannelSearch,
  onUserSearch,
  onArchiveSearch,
  totalCounts,
  channels,
  users,
  archives,
}) => {
  const history = useHistory();
  const getInitialCategories = () =>
    initialCategories.map((category) =>
      initialCode.includes(category.code) ? { ...category, selected: true } : category,
    );
  const initialCode = code?.split('!') || [];
  const [newKeyword, setNewKeyword] = useState(keyword);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [categories, setCategories] = useState(getInitialCategories());
  const [subMenu, setSubMenu] = useState('channel');

  useEffect(() => {
    if (keyword) setNewKeyword(keyword);
    else setNewKeyword('');
  }, [keyword]);

  useEffect(() => {
    setCategories(getInitialCategories());
  }, [code]);

  const onSearch = (categories) => {
    const code = categories
      .filter((category) => category.selected)
      .map((selectedCategory) => selectedCategory.code)
      .join('!');
    history.push(
      `/search?${newKeyword ? `&keyword=${newKeyword}` : ''}${code ? `&code=${code}` : ''}`,
    );
  };

  const onSearchKeyDown = (e) => {
    if (e.keyCode === 13) onSearch(categories);
  };

  const onCategoriesChanged = (e) => {
    const name = e.target.value;
    toggleCategory(name);
  };

  const toggleCategory = (name) => {
    const newCategories = categories.map((category) =>
      category.name === name ? { ...category, selected: !category.selected } : category,
    );
    setCategories(newCategories);
    onSearch(newCategories);
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
                <IconButton size="small" onClick={() => onSearch(categories)}>
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
        <Grid item container bgcolor="#FAFAFC">
          {isCategoriesOpen && (
            <Grid item container pt={1}>
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
          {(isCategoriesOpen ||
            (!isCategoriesOpen &&
              categories.filter((category) => category.selected).length > 0)) && (
            <Grid item container css={categoriesContainer} pb={1}>
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
          )}
        </Grid>
        {isCategoriesOpen && (
          <Grid item container flexDirection="row">
            <Grid
              item
              container
              css={[borderBottom, { borderRight: '1px solid #5f5f5f' }]}
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
              css={[borderBottom]}
              justifyContent="center"
              alignItems="center"
              xs={6}
              onClick={() => onSearch(categories)}
            >
              <Typography fontSize="1.125rem" fontWeight="700" color="#5F5F5F">
                검색
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item container css={width1140px} alignItems="center">
        <Grid item container mb={5} columnGap={5} xs={12} justifyContent="center">
          <Grid item>
            <Button
              className={subMenu === 'channel' && 'selected'}
              css={searchSubButton}
              onClick={() => setSubMenu('channel')}
            >
              재능 공유 채널 ({totalCounts.channels})
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={subMenu === 'user' && 'selected'}
              css={searchSubButton}
              onClick={() => setSubMenu('user')}
            >
              재능 고수 ({totalCounts.users})
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={subMenu === 'archive' && 'selected'}
              css={searchSubButton}
              onClick={() => setSubMenu('archive')}
            >
              모아 보기 ({totalCounts.archives})
            </Button>
          </Grid>
        </Grid>
        {subMenu === 'channel' && (
          <>
            <Grid item container spacing={2}>
              {channels.length === 0 ? (
                <Grid item xs={12} css={noContents}>
                  검색된 채널이 없습니다.
                </Grid>
              ) : (
                channels.map((channel) => (
                  <Grid key={channel.id} item>
                    <ChannelCard channel={channel} />
                  </Grid>
                ))
              )}
            </Grid>
            {channels.length < totalCounts.channels && (
              <Grid item container css={moreButton} justifyContent="center">
                <Typography
                  css={moreButtonText}
                  onClick={() => {
                    onChannelSearch({ skip: channels.length });
                  }}
                >
                  더 보기 ▼
                </Typography>
              </Grid>
            )}
          </>
        )}
        {subMenu === 'user' && (
          <>
            <Grid item container spacing={2}>
              {users.length === 0 ? (
                <Grid item xs={12} css={noContents}>
                  검색된 유저가 없습니다.
                </Grid>
              ) : (
                users.map((user) => (
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
            {users.length < totalCounts.users && (
              <Grid item container css={moreButton} justifyContent="center">
                <Typography
                  css={moreButtonText}
                  onClick={() => {
                    onUserSearch({ skip: users.length });
                  }}
                >
                  더 보기 ▼
                </Typography>
              </Grid>
            )}
          </>
        )}
        {subMenu === 'archive' && (
          <>
            <Grid item container columns={6} spacing="1.375rem">
              {archives.length === 0 ? (
                <Grid item xs={12} css={noContents}>
                  검색된 글이 없습니다.
                </Grid>
              ) : (
                archives.map((archive) => <ArchiveCard key={archive.id} archive={archive} />)
              )}
            </Grid>
            {archives.length < totalCounts.archives && (
              <Grid item container css={moreButton} justifyContent="center">
                <Typography
                  css={moreButtonText}
                  onClick={() => {
                    onArchiveSearch({ skip: archives.length });
                  }}
                >
                  더 보기 ▼
                </Typography>
              </Grid>
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
};

const wrapper = css`
  margin-top: 3.75rem;
  margin-bottom: 6.25rem;
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

const borderBottom = css`
  border-bottom: 1px solid #5f5f5f;
  height: 3.75rem;
  cursor: pointer;
  :hover {
    .MuiTypography-root {
      color: black;
    }
  }
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
  border-bottom: 1px solid #5f5f5f;
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
