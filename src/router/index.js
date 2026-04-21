import { createRouter, createWebHashHistory } from "vue-router"

import HomePage from "../components/home_page.vue"

const routes = [
    {
        path: '/home',
        name: 'home',
        component: HomePage,
        // children: [
        //     {
        //         path: '/client',
        //         component: ClientPage,
        //     },
            
        // ],
    },
    {
        path: '/',
        redirect: '/home',
    },
]

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes
})

export { router }