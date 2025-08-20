import {Routes} from "@angular/router";
import MainLayoutComponent from "./views/main-layout/main-layout.component";

const mainLayoutRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
    },
    {
        path:'',
        component: MainLayoutComponent,
        children: [
            // {
            //     path: 'dashboard',
            //     loadComponent: () => import('./views/main-layout/dasboard'),
            // },
            // {
            //     path: 'users',
            //     loadComponent: () => import('./views/users/index/user-index.component'),
            // },
            {
                path:'menu',
                loadComponent:() => import('./views/menu/index/menu.component'),
            },
            {
                path:'sale',
                loadComponent:() => import('./views/sales/index/sales-index.component'),
            },
        ]
    }
];

export default mainLayoutRoutes;