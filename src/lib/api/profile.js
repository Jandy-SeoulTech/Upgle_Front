import axios from 'axios';

export const uploadProfile = async ({
  userId,
  department,
  introduce,
  welltalent,
  interesttalent,
  src,
}) => {
  const response = await axios({
    url: '/api/Profile',
    method: 'POST',
    data: { userId, department, introduce, welltalent, interesttalent, src },
  });
  return response.data;
};
