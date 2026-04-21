import { createRouter, createWebHistory } from "vue-router"

import HomePage from "../components/home_page.vue"

const routes = [
    {
        path: '/home',
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
    history: createWebHistory(),
    routes
})

export { router }