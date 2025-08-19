import { Routes } from '@angular/router';

export const routes: Routes = [
    // {
    //     path: 'login',
    //     loadChildren: () => import('./features/login/login.routes')
    // },
     {
        path: '',
        loadChildren: () => import('./features/main-layout/main-layout.routes'),
        // canActivate: [authGuard]
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
