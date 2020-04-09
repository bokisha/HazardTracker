import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { GenerateCodeComponent } from './generate-code/generate-code.component';
import { VisitorsListComponent } from './visitors-list/visitors-list.component';

@NgModule({
  declarations: [
    AppComponent,
    GenerateCodeComponent,
    VisitorsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
