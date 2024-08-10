import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/main.css'
import loc from './i18n'

const app = createApp(App);

app.config.globalProperties.window = window;
app.config.globalProperties.document = document;

router.beforeEach((to, from, next) => {
    const isOpen = to.matched.some(record => !record.meta.requiresAuth);
    const isAuth = store.getters['auth/authorized'];
    const withToken = store.getters['auth/token'];
    const isLoginOrRegister = to.matched.some(
        record => record.name === 'login' || record.name === 'register'
    );

    if (isAuth || withToken) {
        if (isLoginOrRegister) {
            next('place');
        } else {
            to.path === '/' ? next('place') : next();
        }
    } else {
        if (isLoginOrRegister) {
            next();
        } else if (isOpen) {
            to.path === '/' ? next('preview') : next();
        } else {
            if (to.path.startsWith('/place')) {
                next('login');
            } else {
                next('preview');
            }
        }
    }
})

router.afterEach(() => {
    store.dispatch('nav/resolve');
});

app.use(loc).use(store).use(router);
app.mount('#app');