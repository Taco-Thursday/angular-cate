import {BrowserModule} from '@angular/platform-browser';
import {Inject, LOCALE_ID, NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CategoryComponent} from './components/category/category.component';
import {ListComponent} from './components/list/list.component';
import {MeasureComponent} from './components/measure/measure.component';
import {MatSortModule} from '@angular/material/sort';
import {MeasureEditComponent} from './components/measure-edit/measure-edit.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ListEditComponent} from './components/list-edit/list-edit.component';
import {MatSelectModule} from '@angular/material/select';
import {IngredientAddComponent} from './components/ingredient-add/ingredient-add.component';
import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MatTooltipModule} from '@angular/material/tooltip';

export const TranslateLoaderFactory = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

// tslint:disable-next-line:typedef
export function LocaleIdFactory() {
  return navigator.language;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CategoryComponent,
    ListComponent,
    MeasureComponent,
    MeasureEditComponent,
    ListEditComponent,
    IngredientAddComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    MatMenuModule,
    MatTableModule,
    ReactiveFormsModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatTooltipModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useFactory: LocaleIdFactory
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private i18n: TranslateService, @Inject(LOCALE_ID) locale: string) {
    this.i18n.use('en-US');
  }
}
