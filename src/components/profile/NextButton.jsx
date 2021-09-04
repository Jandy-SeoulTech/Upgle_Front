/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactComponent as ArrowRight } from '../../lib/assets/arrowRight.svg';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

const NextButton = ({ data, activeStep, onClick }) => {
  const steps = [
    data.wellTalent,
    data.interestTalent,
    data.department,
    data.introduce,
    data.images,
  ];
  console.log(steps);
  return (
    <Button
      onClick={onClick}
      css={steps[activeStep].length === 0 && skipButton}
    >
      {steps[activeStep].length === 0 ? (
        '건너뛰기'
      ) : activeStep === 4 ? (
        '제출'
      ) : (
        <>
          계속 <ArrowRight />
        </>
      )}
    </Button>
  );
};

const skipButton = css`
  border: 2px solid ${palette.black};
  background-color: ${palette.white} !important;
  color: ${palette.black} !important;
  &:hover {
    border: 2px solid ${palette.black};
    background-color: rgba(189, 189, 189, 0.5) !important;
  }
`;

export default NextButton;
