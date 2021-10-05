/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import ReactLoading from 'react-loading';
import palette from '../../lib/styles/palette';

const Loading = (props) => (
  <LoadingWrapper {...props}>
    <ReactLoading type="spinningBubbles" color={palette.black} css={defaultStyle} />
  </LoadingWrapper>
);

const defaultStyle = css`
  text-align: center;
`;

const LoadingWrapper = styled.div`
  padding: 2rem 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Loading;
