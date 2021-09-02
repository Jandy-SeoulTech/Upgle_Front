/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Avatar, Box, Grid, Paper, TextareaAutosize, Typography } from '@material-ui/core';
import { ReactComponent as HeartStraight } from '../../../lib/assets/heartStraight.svg';
import { ReactComponent as UserPlus } from '../../../lib/assets/userPlus.svg';
import { ReactComponent as MoreIcon } from '../../../lib/assets/moreIcon.svg';
import palette from '../../../lib/styles/palette';
import { useEffect, useState } from 'react';
import { ReactComponent as DefaultImage } from '../../../lib/assets/defaultImage.svg';
import { ReactComponent as CancelImage } from '../../../lib/assets/cancelImage.svg';
import ImageUploading from 'react-images-uploading';
import ClearIcon from '@material-ui/icons/Clear';

import TextField from '../../common/TextField';
import Button from '../../common/Button';
import { isNickname } from '../../../lib/util/validate';


const ProfileSetting = ({
  images,
  uploadImage,
  initializeImage,
  onCheckNickname,
  userInfo,
  handleChangeFiled,
  nicknameDuplicateError
}) => {

  const [scrollY, setScrollY] = useState(0);
  const listener = () => {
    setScrollY(window.pageYOffset);
  };
  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  // ------------------------------------------------------------------------
  // image
  const onChange = (imageList) => {
    if (imageList.length === 0) return;
    const formData = new FormData();
    formData.append('files', imageList[0].file);
    uploadImage(formData);
  };

  // ------------------------------------------------------------------------
  // nickname

  const [nicknameFormatError, setNicknameFormatError] = useState(false);
  const handleNicknameChange = (e) => {
    if (!isNickname(e.target.value)) {
      setNicknameFormatError(true);
    }
    onCheckNickname({ nickname: e.traget.value });
    setNicknameFormatError(false);
    handleChangeFiled({
      key: 'nickname',
      value: e.target.value,
    });
  };

  // ------------------------------------------------------------------------
  // introduce

  const [introLengthError, setIntroLengthError] = useState();
  const handleChangeIntro = (e) => {
    if (e.target.value.length > 500) {
      setIntroLengthError(true);
      return;
    }
    setIntroLengthError(false);
    handleChangeFiled({
      key: 'introduce',
      value: e.target.value,
    });
  };

  // ------------------------------------------------------------------------
  // department

  const [departmentLengthError, setDepartmentLengthError] = useState();
  const handleChangeDepartment = (e) => {
    if (e.target.value.length > 20) {
      setDepartmentLengthError(true);
      return;
    }
    setDepartmentLengthError(false);
    handleChangeFiled({
      key: 'department',
      value: e.target.value,
    });
  };

  // ------------------------------------------------------------------------
  // wellTalent
  const [wellInput, setWellInput] = useState('');
  const [wellLengthError, setWellLengthError] = useState(false);

  const handleChangeWellTalent = (e) => {
    if (e.target.value.length > 10) {
      setWellLengthError(true);
      return;
    }
    setWellLengthError(false);
    setWellInput(e.target.value);
  };

  const handleWellKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCreateWellTalent();
    }
  };

  const handleCreateWellTalent = () => {
    if (userInfo.wellTalent.length < 10) {
      handleChangeFiled({
        key: 'interestTalent',
        value: userInfo.wellTalent.concat(wellInput),
      });
    }
    setWellInput('');
  };

  const handleDeleteWellTalent = (index) => {
    handleChangeFiled({
      key: 'interestTalent',
      value: userInfo.wellTalent.filter((talent, i) => index !== i),
    });
  };

  // ------------------------------------------------------------------------
  // interestTalent
  const [interestInput, setInterestInput] = useState('');
  const [interestLengthError, setInterestLengthError] = useState(false);

  const handleChangeInterestTalent = (e) => {
    if (e.target.value.length > 10) {
      setInterestLengthError(true);
      return;
    }
    setInterestLengthError(false);
    setInterestInput(e.target.value);
  };

  const handleInterestKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCreateInterestTalent();
    }
  };

  const handleCreateInterestTalent = () => {
    if (userInfo.interestTalent.length < 10) {
      handleChangeFiled({
        key: 'interestTalent',
        value: userInfo.interestTalent.concat(interestInput),
      });
    }
    setInterestInput('');
  };

  const handleDeleteInterestTalent = (index) => {
    handleChangeFiled({
      key: 'interestTalent',
      value: userInfo.interestTalent.filter((talent, i) => index !== i),
    });
  };





  return (
    <Grid container justifyContent="center" css={profileSettingWrapper}>
      <Grid item container css={{ width: '1200px'}} >
        <Grid item css={profileSettingNav}>
          <Typography className={scrollY < 150 && "current"}>프로필 설정</Typography>
          <Typography className={(scrollY >= 150 && scrollY < 300) && "current"}>비밀번호 관리</Typography>
          <Typography className={(scrollY >= 300 && scrollY < 500) && "current"}>알림 설정</Typography>
        </Grid>
        <Grid item container css={profileSettingContents}>
          <Grid item container css={profileSettingContent}>
            <Grid xs={4} item>
              <ImageUploading onChange={onChange}>
                {({ onImageUpload, isDragging, dragProps }) => (
                  <div css={{ position: "relative", width: '11.25rem', height: '11.25rem', margin: 'auto' }}>
                    <CancelImage css={cancelImage} onClick={initializeImage} />
                    <div
                      {...dragProps}
                      onClick={onImageUpload}
                      css={dragSenser(isDragging)}
                    ></div>
                    {images.length === 0 ? (
                      <DefaultImage css={currentImage} />
                    ) : (
                      <img src={images[0]} alt="" css={currentImage} />
                    )}
                  </div>
                )}
              </ImageUploading>
              <Typography css={{textAlign: 'center', marginTop: '25px'}}>
                exampleEmail@gmail.com
              </Typography>
            </Grid>
            <Grid xs={8} item container css={profileContentWrapper} spacing={2}>
              <Grid item>
                <Typography>닉네임</Typography>
                <TextField
                  size="small"
                  fullWidth
                  label=""
                  variant="outlined"
                  placeholder=""
                  error={nicknameFormatError || nicknameDuplicateError}
                  helperText={
                    (nicknameFormatError && '유효하지 않은 닉네임입니다.') ||
                    (nicknameDuplicateError && '중복된 닉네임입니다.')
                  }
                  value={userInfo.nickname}
                  onChange={handleNicknameChange}
                  css={input}
                />
              </Grid>
              <Grid item>
                <Typography>자기 소개</Typography>
                <TextareaAutosize
                  placeholder=""
                  value={userInfo.introduce}
                  minRows={10}
                  maxRows={16}
                  onChange={handleChangeIntro}
                  css={introduceForm(introLengthError)}
                />
                {introLengthError && (
                  <Typography sx={{ color: 'red', fontSize: '0.75rem' }}>
                    글자수 제한을 조과하였습니다. (500자 이내)
                  </Typography>
                )}
              </Grid>
              <Grid item>
                <Typography>소속</Typography>
                <TextField
                  size="small"
                  label=""
                  variant="outlined"
                  fullWidth
                  placeholder=""
                  value={userInfo.department}
                  onChange={handleChangeDepartment}
                  error={departmentLengthError}
                  helperText={
                    (departmentLengthError && '글자수 제한을 조과하였습니다. (20자 이내)')
                  }
                  css={input}
                />
              </Grid>
              <Grid item>
                <Typography>잘하는 재능</Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  label=""
                  fullWidth
                  value={wellInput}
                  onChange={handleChangeWellTalent}
                  onKeyPress={handleWellKeyPress}
                  error={userInfo.wellTalent.length >= 10 || wellLengthError}
                  helperText={
                    userInfo.wellTalent.length >= 10
                      ? '더이상 추가할 수 없습니다.'
                      : wellLengthError && '10자 이내로 입력해주세요'
                  }
                  css={input}
                />
                <Grid container spacing={1} css={talentWrapper}>
                  {userInfo.wellTalent.map((talent, i) => (
                    <Grid item key={i}>
                      <Box
                        onClick={() => {
                          handleDeleteWellTalent(i);
                        }}
                      >
                        <Typography>{talent}</Typography>
                        <ClearIcon className="cancelIcon" />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item>
                <Typography>관심 있는 재능</Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  label=""
                  fullWidth
                  value={interestInput}
                  onChange={handleChangeInterestTalent}
                  onKeyPress={handleInterestKeyPress}
                  error={userInfo.interestTalent.length >= 10 || interestLengthError}
                  helperText={
                    userInfo.interestTalent.length >= 10
                      ? '더이상 추가할 수 없습니다.'
                      : interestLengthError && '10자 이내로 입력해주세요'
                  }
                  css={input}
                />
                <Grid container spacing={1} css={talentWrapper}>
                  {userInfo.interestTalent.map((talent, i) => (
                    <Grid item key={i}>
                      <Box
                        onClick={() => {
                          handleDeleteInterestTalent(i);
                        }}
                      >
                        <Typography>{talent}</Typography>
                        <ClearIcon className="cancelIcon" />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item>
                <Button css={submitButton}>
                  변경 내용 저장
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container css={profileSettingContent}>
            <Grid xs={4} item></Grid>
            <Grid xs={8} item container css={profileContentWrapper} spacing={1.875}>
              <Grid item>
                <Typography>현재 비밀번호</Typography>
                <TextField
                  size="small"
                  label=""
                  variant="outlined"
                  fullWidth
                  placeholder=""
                  value={1}
                  onChange={1}
                  error={null}
                  helperText={null}
                  css={input}
                />
              </Grid>
              <Grid item>
                <Typography>새 비밀번호</Typography>
                <TextField
                  size="small"
                  label=""
                  variant="outlined"
                  fullWidth
                  placeholder=""
                  value={1}
                  onChange={1}
                  error={null}
                  helperText={null}
                  css={input}
                />
              </Grid>
              <Grid item>
                <Typography>새 비밀번호 확인</Typography>
                <TextField
                  size="small"
                  label=""
                  variant="outlined"
                  fullWidth
                  placeholder=""
                  value={1}
                  onChange={1}
                  error={null}
                  helperText={null}
                  css={input}
                />
              </Grid>
              <Grid item>
                <Button css={submitButton}>
                  변경 내용 저장
                </Button>
              </Grid>
            </Grid>


            
              
          </Grid>
          <Grid item css={profileSettingContent}>
          </Grid>

        </Grid>
        
      </Grid>
    </Grid>
  )
}

const profileSettingWrapper = css`
  margin-top: 60px;
  background-color: #F0F0F0;
`;

const profileSettingNav = css`
  width: 267px;
  height: fit-content;
  background-color:${palette.white};
  margin: 1rem;
  position: fixed;
  transition: all ease 1s;
  font-weight: 500;
  font-size: 20px;
  font-family: 'Noto Sans KR';
  .MuiTypography-root {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    border-bottom: 1px solid #E0E0E0;
  }
  .current {
    border-left: 7px solid ${palette.orange};
    color: ${palette.orange};
    font-weight: 700;
  }
`;
const profileSettingContents = css`
  width: 850px;
  margin: 1rem;
  margin-left: 300px;
  flex-direction: column;
  background-color: #F0F0F0;
`;
const profileSettingContent = css`
  margin-bottom: 50px;
  background-color: ${palette.white};
  padding: 75px 50px;
`;

const profileContentWrapper = css`
  flex-direction: column;
  &>.MuiGrid-root {
    margin-left: 1rem;
    margin-bottom: 1rem;
  }
`;

const dragSenser = (isDragging) => css`
  width: 11.25rem;
  height: 11.25rem;
  position: absolute;
  border-radius: 50%;
  cursor: pointer;
  z-index: 2;
  background-color: ${isDragging && 'rgba(0, 0, 0, 0.3)'};
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const currentImage = css`
  position: absolute;
  width: 11.25rem;
  height: 11.25rem;
  border-radius: 50%;
  z-index: 1;
`;

const cancelImage = css`
  width: 2.5rem;
  height: 2.5rem;
  left: 8.1875rem;
  top: 8.1875rem;
  position: absolute;
  cursor: pointer;
  z-index:3;
`;

const input = css`
  height: 39px;
  margin-bottom: 7px;
  .MuiInput-root {
    &::before {
      border-bottom: 1px solid ${palette.black} !important;
    }
    &::after {
      border-bottom: 2px solid ${palette.black} !important;
    }
  }
  .MuiInputLabel-root {
    font-weight: bold;
    font-size: 16px;
  }
  .MuiInputLabel-root.Mui-focused {
    color: black;
    font-size: 16px !important;
  }
`;

const introduceForm = (lengthError) => css`
  width: 100%;
  height: 15.625rem;
  background: #f0f0f0;
  font-size: 0.875rem;
  font-family: 'Barlow', 'Noto Sans KR';
  font-weight: 500;
  padding: 0.9375rem 0.75rem;
  resize: none;
  outline: ${lengthError && '1px solid red'};
  &:focus-visible {
    outline: ${lengthError
    ? '2px solid red !important;'
    : '2px solid black !important;'};
  }
`;


const talentWrapper = css`
  margin-top: 35px;
  flex-wrap: wrap;
  background-color: #E0E0E0;
  padding: 10px 18px 18px 10px;
  border-radius: 5px;
  .MuiBox-root {
    display: flex;
    align-items: center;
    height: 1.625rem;

    background: #7b7b7b;
    border: 1px solid #7b7b7b;
    border-radius: 20px;
    padding: 0.3125rem 0.625rem;

    .MuiTypography-root {
      color: ${palette.white};
      font-family: 'Barlow', 'Noto Sans KR';
      font-size: 0.75rem;
      text-align: center;
    }
    .cancelIcon {
      width: 0.8rem;
      height: 0.8rem;
      color: #7b7b7b;
      margin-left: 0.4375rem;
      display: none;
    }

    &:hover {
      cursor: pointer;
      background: rgba(130, 130, 130, 0.3);
      border: 1px solid #7b7b7b;
      .cancelIcon {
        display: block;
      }
      .MuiTypography-root {
        color: ${palette.black};
      }
    }
  }
`;

const submitButton = css`
  width: 100%;
  height: 60px;
  margin-top: 70px;
  border-radius: 50px;
  background-color: black;
  color: white;
  font-family: 'Barlow', 'Noto Sans KR';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
`;


export default ProfileSetting