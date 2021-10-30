import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { AccountsComponent } from './accounts/accounts.component';
import { EmbarquesComponent } from './embarques/embarques.component';
import { StatusEmbarquesComponent } from './status-embarques/status-embarques.component';


const accountsModule= () => import('./accounts/accounts.module').then(x => x.AccountsModule);
const statusModule = () => import('./status-embarques/staus-embarques.module').then(x => x.StatusEmbarquesModule);
const embarquesModule = () => import('./embarques/embarques.module').then(x => x.EmbarquesModule);
const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: 'accounts',
        loadChildren: accountsModule,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: 'embarques',
        loadChildren: embarquesModule 
    }, 
    {
        path: 'status', loadChildren: statusModule,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: 'login',
        component: LoginComponent
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
