import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { initialize, uploadImages } from '../../../modules/image';
import { check, setNicknameState } from '../../../modules/user';
import { changeField, uploadProfile } from '../../../modules/write';
import {
    checkNickname,
    initAuth,
    nicknameChanged,
    setNickname,
} from '../../../modules/auth';
import ProfileSetting from '../../../components/profile/setting/ProfileSetting';

const ProfileSettingContainer = (props) => {
    const { user } = useSelector((state) => state.user);
    // 수정 필요
    const { nicknameChecked, setNicknameSuccess } = useSelector(
        (state) => state.auth,
    );
    // 수정 필요 userInfo.머시기
    const { department, introduce, wellTalent, interestTalent } = useSelector(
        (state) => state.write.writeProfile,
    );
    const { profile, error } = useSelector((state) => state.write);
    const { images } = useSelector((state) => state.image);
    const dispatch = useDispatch();
    const history = useHistory();




    const handleChangeFiled = ({ key, value }) => {
        dispatch(changeField({ key, value }));
    };

    
    /* const handleUploadProfile = () => {
        dispatch(
            uploadProfile({
                userId: user.id,
                department,
                introduce,
                wellTalent,
                interestTalent,
                src: images[0] || null,
            }),
        );
    }; */

    const uploadImage = (formData) => {
        dispatch(uploadImages(formData));
    };

    const initializeImage = () => {
        dispatch(initialize());
    };

    const onCheckNickname = ({ nickname }) => {
        dispatch(checkNickname({ nickname }));
    };

    /* useEffect(() => {
        return () => {
            dispatch(initAuth());
        };
    }, [dispatch]); */



    useEffect(() => {
        if (profile) {
            alert('등록이 완료됐습니다!');
            dispatch(check());
        }
        if (error) {
            alert('등록을 실패했습니다.');
        }
    }, [history, profile, dispatch, error]);

    useEffect(() => {
        if (user && user.profile) {
            history.push('/');
        }
    }, [history, user]);



    // if (!user) return 'loading';
    const userInfo = {
        nickname: 'codeking',
        introduce: '안녕안녕안녕',
        department: '스리랑카',
        interestTalent: [
            '요리',
            '요리',
            '요리',
            '요리',
            '요리',
            '요리',
            '요리',
            '요리',
            '요리',
        ],
        wellTalent: [
            '사진',
            '사진',
            '사진',
            '사진',
            '사진',
            '사진',
            '사진',
            '사진',
            '사진',
            '사진',
        ],
    };
    return (
        <ProfileSetting
            images={images}
            uploadImage={uploadImage}
            initializeImage={initializeImage}
            onCheckNickname={onCheckNickname}
            userInfo={userInfo}
            handleChangeFiled={handleChangeFiled}
            nicknameDuplicateError={!nicknameChecked}
        />
    );
};

export default ProfileSettingContainer;
