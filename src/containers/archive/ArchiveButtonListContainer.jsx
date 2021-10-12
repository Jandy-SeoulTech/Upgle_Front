import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../components/common/Loading';
import ArchiveButtonList from '../../components/archive/ArchiveButtonList';
import { likeArchive, unlikeArchive } from '../../modules/archive';

const ArchiveButtonListContainer = ({ channelId, archiveId }) => {
  const { archive, likeError, unlikeError } = useSelector((state) => state.archive);
  const { user } = useSelector((state) => state.user);
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();

  const onLikeArchive = async () => {
    await dispatch(likeArchive({ channelId, archiveId }));
    if (!likeError) setIsLiked(true);
  };

  const onUnlikeArchive = async () => {
    await dispatch(unlikeArchive({ archiveId }));
    if (!unlikeError) setIsLiked(false);
  };

  useEffect(() => {
    if (archive && user) {
      setIsLiked(!!archive.archiveLike.filter((like) => like.userId === user.id).length);
    }
  }, [archive, user]);

  if (!archive) return <Loading css={{ backgroundColor: '#fafafc' }} />;

  return (
    <ArchiveButtonList
      archive={archive}
      isLiked={isLiked}
      onLikeArchive={onLikeArchive}
      onUnlikeArchive={onUnlikeArchive}
    />
  );
};

export default ArchiveButtonListContainer;
