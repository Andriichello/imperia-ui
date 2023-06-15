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
    const isLoginOrRegister = to.matched.some(
        record => record.name === 'login' || record.name === 'register'
    );

    if (isLoginOrRegister && isAuth) {
        next('/preview');
    } else if (isOpen || isAuth) {
        to.path === '/' ? next('preview') : next();
    } else {
        next(`/preview`);
    }
})

router.afterEach(() => {
    store.dispatch('nav/resolve');
});

app.use(loc).use(store).use(router);
app.mount('#app');