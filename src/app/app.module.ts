import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { LoginPageComponent } from './login-page/login-page.component';
 import {DragDropModule,CdkDragDrop } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchcomponentComponent } from './searchcomponent/searchcomponent.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    LoginPageComponent,
    SearchcomponentComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule

    
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
