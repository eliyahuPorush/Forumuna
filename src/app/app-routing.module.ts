import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignUPComponent } from './components/auth/sign-up/sign-up.component';
import { ForumPageComponent } from './components/main-page/forum-page/forum-page.component';
import { ForumsListComponent } from './components/main-page/forums-list/forums-list.component';
import { MainPageComponent } from './components/main-page/main-page.component';


const routes: Routes = [
  {path: 'main', component: MainPageComponent, children:[
    {path: 'forums-list', component: ForumsListComponent},
    {path: 'forum/:listID' ,component: ForumPageComponent},
    {path: '', redirectTo: 'forums-list', pathMatch:'full'}
  ]},
  {path: 'login', component: LoginComponent},
  {path: 'signUp', component: SignUPComponent},
  {path: '', redirectTo: 'main', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
