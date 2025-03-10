import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = [];

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        createMessage: (state, action) => {
            state.push(action.payload);
        },
        removeMessage: (state, action) =>
            state.filter(msg => msg.id !== action.payload),
    },
});

export const createAsyncMessage = createAsyncThunk(
    'message/createAsyncMessage',
    async (payload, { dispatch, requestId }) => {
        dispatch(
            messageSlice.actions.createMessage({
                ...payload,
                id: requestId,
            })
        );
        setTimeout(() => {
            dispatch(messageSlice.actions.removeMessage(requestId));
        }, 2000);
    }
);

export const { createMessage, removeMessage } = messageSlice.actions;
export default messageSlice.reducer;
