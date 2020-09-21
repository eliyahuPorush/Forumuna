import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/main-page/header/header.component';
import { ForumsListComponent } from './components/main-page/forums-list/forums-list.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignUPComponent } from './components/auth/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ForumsListComponent,
    MainPageComponent,
    LoginComponent,
    SignUPComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
