import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './modules/auth-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AuthModule, AuthRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
