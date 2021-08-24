import axios from 'axios';

export const uploadProfile = async ({
  userId,
  department,
  introduce,
  wellTalent,
  interestTalent,
  src,
}) => {
  const response = await axios({
    url: '/api/Profile',
    method: 'POST',
    data: { userId, department, introduce, wellTalent, interestTalent, src },
  });
  return response.data;
};
