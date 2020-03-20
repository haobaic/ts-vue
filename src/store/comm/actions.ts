import { ActionTree } from "vuex";
import jwt_decode from 'jwt-decode'; //解析token
const actions:ActionTree<any,any>={
    async setUser({state,commit},user:any){
        const decode=jwt_decode(user);
        console.log(decode)
        commit("SET_USER",decode)
    }
}
export default actions;