import Cookie from 'js-cookie';

export default {
    state: {
        token: '',
        menu: [],
    },
    mutations: {
        setToken(state, val) {
            state.token = val;
            Cookie.set('token', val);
        },
        removeToken(state) {
            state.token = '';
            Cookie.remove('token');
        },
        getToken(state) {
            if (state.token) {
                state.token = state.token;
            }else {
                state.token = Cookie.get('token');
            }
        },
        setMenu(state, val) {
            state.menu = val;
        }
    }
}