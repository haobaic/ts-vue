import { GetterTree } from "vuex";
const getter:GetterTree<any,any>={
    user(state,any):any{
        return state.user;
    },
    routers(state,any):any{
        return state.routers;
    }
}
export default getter;