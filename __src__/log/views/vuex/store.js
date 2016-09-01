/**
 * @file
 * @author zhujianchen
 * @description
 */
import middlewares from './middlewares';
import {INCREMENT, TOGGLESEARCH, MENUMUTATION} from './mutation-types';

const state = {
    count: 1,
    showSearch: true,
    menuFrom: 'parent'
};

const mutations = {
    [INCREMENT](state) {
        state.count++;
    },

    [TOGGLESEARCH](state, bool) {
        state.showSearch = bool;
    },
    [MENUMUTATION](state, args) {
        window._.extend(state, args);
    }
};

export default new window.Vuex.Store({
    state,
    mutations,
    middlewares
});
