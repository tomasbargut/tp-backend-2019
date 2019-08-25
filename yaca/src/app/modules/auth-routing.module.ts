import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { AuthTabsComponent } from '../componets/auth-tabs/auth-tabs.component';

const routes: Routes = [
  {
    path: '',
    component: AuthTabsComponent
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes) ]
})
export class AuthRoutingModule {}
