import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/main.css'

const app = createApp(App);

router.beforeEach((to, from, next) => {
    const isOpen = to.matched.some(record => !record.meta.requiresAuth);
    const isAuth = store.getters['auth/authorized'];
    const isLoginOrRegister = to.matched.some(
        record => record.name === 'login' || record.name === 'register'
    );

    if (isLoginOrRegister && isAuth) {
        next('home');
    } else if (isOpen || isAuth) {
        next();
    } else {
        console.log('to: ', to);
        console.log('from: ', from);

        next(`/login?redirect=${to.path}`);
    }
})

app.use(store).use(router);
app.mount('#app');