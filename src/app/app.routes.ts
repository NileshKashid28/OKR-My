import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { AuthGuard } from './auth.guard';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { ViewTeamComponent } from './view-team/view-team.component';

export const routes: Routes = [
    {
        path : 'home',
        component : HomePageComponent,
        canActivate: [AuthGuard], // when enabled you gotta login throug OTP 
    },
    {
        path :'login',
        component : LoginComponent
    },
        {
        path:'createteam',
        component:CreateTeamComponent   
    },
    {
        path:'viewteam',
        component:ViewTeamComponent
    },
    // {
    //     path: '**', redirectTo: 'login',
    // },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path:'createuser',
        component:CreateUserComponent

    } , 
    {
        path: 'user-details/:id', 
        component: UserDetailsComponent
    },
    {
        path : '', redirectTo : 'login',
        pathMatch : 'full'
    }
];
