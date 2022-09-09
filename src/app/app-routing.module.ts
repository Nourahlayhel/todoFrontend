import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './authguard.guard';
import { LoginPageComponent } from './login-page/login-page.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes: Routes =
 [{path:'',component:LoginPageComponent},
{path:'TodoList/:id',component:TodoListComponent,canActivate:[AuthguardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
