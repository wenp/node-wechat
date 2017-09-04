// 根模块
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import { AppRouteModule } from "./app.route.module";

import { HttpModule , Http} from '@angular/http';
// 国际化
export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRouteModule,
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
