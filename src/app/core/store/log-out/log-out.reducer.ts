import { ActionReducer, MetaReducer } from '@ngrx/store';
import * as AuthAcions from '../log-out/log-out.actions';

export function clearStateLogOutReducer(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reducer: ActionReducer<any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): ActionReducer<any> {
    return (state, action) => {
        console.log('action', action);
        if (action.type === AuthAcions.logoutSuccess.type) {
            state = undefined;
        }
        return reducer(state, action);
    };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logOutMetaReducers: MetaReducer<any>[] = [clearStateLogOutReducer];
