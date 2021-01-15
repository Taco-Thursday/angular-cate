import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-ingredient-add',
  templateUrl: './ingredient-add.component.html',
  styleUrls: ['./ingredient-add.component.scss']
})
export class IngredientAddComponent implements OnInit {

  public id: any;
  public token: any;
  public typeName: any = ['核心业务', '活动业务', '特殊事件', '员工餐'];
  public measureList: any;
  public measureIndex: any;
  public categoryList: any;
  public cateIndex: any;
  public accountList: any;
  public accountData: any;
  public acctData: any;
  public costData: any;
  public saleData: any;
  measureVisible = false;
  cateVisible = false;
  profileForm = new FormGroup({
    type: new FormControl(1, Validators.required),
    name: new FormControl('', Validators.required),
    name_en: new FormControl('', Validators.required),
    group_unit_id: new FormControl(0, Validators.required),
    inventory_unit_id: new FormControl(0, Validators.required),
    category_id: new FormControl(0, Validators.required),
    acct_number: new FormControl(0, Validators.required),
    cost_acct_number: new FormControl(0, Validators.required),
    sale_acct_number: new FormControl(0, Validators.required),
    period: new FormControl(''),
  });

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    public router: Router,
  ) {
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('category_token');
    this.http.get('/api/measure_unit_group/', {params: {_with: 'measureUnits,baseUnit', token: this.token}})
      .subscribe((res: any) => {
        this.measureList = res.data;
      });
    this.http.get('/api/category', {params: {token: this.token}})
      .subscribe((res: any) => {
        this.categoryList = res.data;
      });
    this.http.get('/api/ingredient/accounts', {params: {token: this.token}})
      .subscribe((res: any) => {
        this.accountList = res.data;
      });
  }

  onSubmit(): void {
    this.http.post('/api/ingredient?_with=photo,preppedIngredients', this.profileForm.value, {
      params: {
        token: this.token
      }
    })
      .subscribe((res: any) => {
        this.router.navigate(['/category/list']).then(r => {
        });
      });
  }

  onBack(): void {
    this.router.navigate(['/category/list']).then(r => {
    });
  }

  onGroup(e: any): void {
    this.measureIndex = e;
    this.measureVisible = true;
  }

  onCategory(e: any): void {
    this.cateIndex = e;
    this.cateVisible = true;
    this.accountData = this.categoryList.filter((item: any) => {
      return this.cateIndex === item.id;
    });
    this.acctData = this.accountList.filter((item: any) => {
      return item.k3_number === this.accountData[0].acct_number;
    });
    this.costData = this.accountList.filter((item: any) => {
      return item.k3_number === this.accountData[0].cost_acct_number;
    });
    this.saleData = this.accountList.filter((item: any) => {
      return item.k3_number === this.accountData[0].sale_acct_number;
    });
  }

}
