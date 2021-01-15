import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {CategoryComponent} from './components/category/category.component';
import {ListComponent} from './components/list/list.component';
import {MeasureComponent} from './components/measure/measure.component';
import {MeasureEditComponent} from './components/measure-edit/measure-edit.component';
import {ListEditComponent} from './components/list-edit/list-edit.component';
import {IngredientAddComponent} from './components/ingredient-add/ingredient-add.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: '', redirectTo: 'login', pathMatch: 'full',
  },
  {
    path: 'category',
    component: CategoryComponent,
    children: [
      {path: 'list', component: ListComponent},
      {path: 'list/:id', component: ListEditComponent},
      {path: 'create', component: ListEditComponent},
      {path: 'list/add', component: ListEditComponent},
      {path: 'measure', component: MeasureComponent},
      {path: 'measure/:id', component: MeasureEditComponent},
      {path: 'measure/add', component: MeasureEditComponent},
      {path: 'ingredient/add', component: IngredientAddComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
