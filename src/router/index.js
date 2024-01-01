import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue"
import History from "../views/History.vue"
import Upload from "../views/Upload.vue"
import Consultation from "../views/Consultation.vue"

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/history",
        name: "History",
        component: History,
    },
    {
        path: "/analyze",
        name: "Upload",
        component: Upload,
    },
    {
        path: "/consultation",
        name: "Consultation",
        component: Consultation,
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;