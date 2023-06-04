import {AddUserAction, UserListAction, UserListState} from "../types";
import {USER_LIST_ACTION_TYPES} from "./actions";

export const initialState: UserListState = [
    {
        name: 'Alberto',
        surname: 'garcía',
        age: 46
    },
];

export const userList = (
    state: UserListState = initialState,
    action: UserListAction
) => {
    const newState: UserListState = [...state]; // deep-cloning
    switch (action.type) {
        case USER_LIST_ACTION_TYPES.ADD_USER:
            // pay attention to type-casting on action
            const payload = <AddUserAction>action;
            const {name, surname, age} = payload.userData;
            return [...newState, {name, surname, age}];

        // define rest of actions here
        default:
            return state;
    }
}