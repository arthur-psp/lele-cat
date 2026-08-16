import { createRouter, createWebHashHistory } from "vue-router"

import HomePage from "../components/home_page.vue"
import PaymentView from "../module/payment/view/payment_view.vue"

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
        path: '/payment',
        name: 'Pagamento',
        component: PaymentView
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