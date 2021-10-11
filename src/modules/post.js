import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender/lib/utils';
import * as postAPI from '../lib/api/post';

const GET_CHANNEL_POST_LIST = 'post/GET_CHANNEL_POST_LIST'
const GET_POST = 'post/GET_POST'
const WRITE_POST = 'post/WRITE_POST'
const EDIT_POST = 'post/EDIT_POST'
const DELETE_POST = 'post/DELETE_POST'
const ATTENTION_POST = 'post/ATTENTION_POST'
const UNATTENTION_POST = 'post/UNATTENTION_POST'
const INIT_POST = 'post/INIT_POST'

export const getChannelPostList = createAction(GET_CHANNEL_POST_LIST, postAPI.getChannelPostList);
export const getPost = createAction(GET_POST, postAPI.getPost);
export const writePost = createAction(WRITE_POST, postAPI.writePost);
export const editPost = createAction(EDIT_POST, postAPI.editPost);
export const deletePost = createAction(DELETE_POST, postAPI.deletePost);
export const attentionPost = createAction(ATTENTION_POST, postAPI.attentionPost);
export const unAttentionPost = createAction(UNATTENTION_POST, postAPI.unAttentionPost);
export const initPost = createAction(INIT_POST);

const initialState = {
    postList: null,
    totalPage: null,
    post: null,
    error: null,
};

export default handleActions(
    {
        [INIT_POST]: (state) => initialState,
        ...pender({
            type: GET_CHANNEL_POST_LIST,
            onSuccess: (state, { payload }) => ({
                ...state,
                postList: payload.posts,
                totalPage: payload.totalPage
            }),
        }),
        ...pender({
            type: GET_POST,
            onSuccess: (state, { payload: post }) => ({
                ...state,
                post
            }),
        }),
        ...pender({
            type: ATTENTION_POST,
            onSuccess: (state, { payload: post }) => ({
                ...state,
                post
            }),
        }),
        ...pender({
            type: UNATTENTION_POST,
            onSuccess: (state, { payload: post }) => ({
                ...state,
                post
            }),
        }),
    },
    initialState,
);
