import {createApp} from 'vue'
import App from "@/App.vue";
import MainPage from './views/MainPage.vue'
import Info2 from './views/Debug.vue'

import Nft2 from './views/Nft2.vue'
import Bridge from './views/Bridge.vue'
import Bridge2 from './views/Bridge2.vue'


import "@fortawesome/fontawesome-free/css/all.min.css";

import {
    createWebHistory,
    createRouter
} from "vue-router";

const routes = [{
    path: "/",
    component: MainPage,
},
    {
        path: "/Info1",
        component: MainPage,
    },
    {
        path: "/Info2",
        component: Info2,
    },
    {
        path: "/Nft2",
        component: Nft2,
    },
    {
        path: "/Bridge1",
        component: Bridge,
    },
    {
        path: "/Bridge2",
        component: Bridge2,
    },


];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App)
    .use(router)
    // .use(VueAxios, axios)
    .mount("#app");


// createApp(App).mount('#app')
