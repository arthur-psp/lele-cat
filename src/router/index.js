import { createRouter, createWebHashHistory } from "vue-router"

import HomePage from "../components/home_page.vue"
import ChooseProduct from "../module/payment/view/choose_product.vue"

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
        path: '/choose-products',
        name: 'Pagamento',
        component: ChooseProduct
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