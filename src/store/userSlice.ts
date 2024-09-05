import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userSliceType {
    email: string
    picture: string
}
const initialState: userSliceType = {
    email: '',
    picture: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserLogin: (state, action: PayloadAction<any>) => {
            const { user, picture } = action.payload
            state.email = user
            state.picture = picture

        },
        updateUserLogout: (state) => {
            state.email = ''
            state.picture = ''
        }
    }
})

export const { updateUserLogin,updateUserLogout } = userSlice.actions
export default userSlice.reducer;