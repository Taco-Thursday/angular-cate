import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../http-interceptors/HttpService';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.scss'],
  providers: [HttpService],
})
export class ListEditComponent implements OnInit {

  public id: any;
  public pid: any;
  public token: any;
  public listName: any;
  public cateName: any;
  public cateGory: any;
  public acctName: any;
  editVisible = false;
  pidVisible = false;
  profileForm = new FormGroup({
    code: new FormControl({value: 0, disabled: true}),
    p_id: new FormControl(0),
    name: new FormControl('', Validators.required),
    name_en: new FormControl('', Validators.required),
    acct_number: new FormControl('', Validators.required),
    cost_acct_number: new FormControl('', Validators.required),
    sale_acct_number: new FormControl('', Validators.required),
  });

  constructor(
    private http: HttpClient,
    private $http: HttpService,
    private route: ActivatedRoute,
    public router: Router,
  ) {

  }

  ngOnInit(): void {
    this.token = localStorage.getItem('category_token');
    this.route.queryParams.subscribe((data) => {
      this.id = data.id;
      this.pid = data.pid;
    });
    this.route.params.subscribe((data) => {
      this.id = data.id;
    });

    this.$http.get('/api/ingredient/accounts', {params: {token: this.token}})
      .subscribe((res: any) => {
        this.cateName = res.data;
      });

    this.$http.get('/api/category', {params: {token: this.token}})
      .subscribe((res: any) => {
          if (this.pid) {
            this.pidVisible = true;
            this.listName = res.data.filter((item: any) => {
              // tslint:disable-next-line:triple-equals
              return this.pid == item.id;
            });
          } else if (this.id !== 'add' && this.pid === undefined) {
            this.editVisible = true;
            this.$http.get('/api/category/' + this.id, {params: {_with: '', token: this.token}})
              .subscribe((item: any) => {
                this.cateGory = res.data
                  .filter((inx: any) => {
                    return inx.acct_number === item.data.acct_number;
                  });
                this.acctName = this.cateGory[0].name;
                this.profileForm.patchValue({
                  code: item.data.code,
                  p_id: item.data.p_id,
                  name: item.data.name,
                  name_en: item.data.name_en,
                  acct_number: this.cateGory[0].acct_number,
                  cost_acct_number: this.cateGory[0].cost_acct_number,
                  sale_acct_number: this.cateGory[0].sale_acct_number,
                });
              });
          }
        }
      );
  }

  onSubmit(): void {
    if (this.id === 'add') {
      this.$http.post('/api/category?_with=', this.profileForm.value, {
        params: {
          token: this.token
        }
      })
        .subscribe((res: any) => {
          this.router.navigate(['/category/list']).then(r => {
          });
        });
    } else if (this.pid) {
      this.profileForm.patchValue({
        p_id: this.pid,
      });
      this.$http.post('/api/category?_with=', this.profileForm.value, {
        params: {
          token: this.token
        }
      })
        .subscribe((res: any) => {
          this.router.navigate(['/category/list']).then(r => {
          });
        });
    } else if (this.id !== 'add' && this.pid === undefined) {
      this.http.put('/api/category/' + this.id, this.profileForm.value, {
        params: {
          _with: '',
          token: this.token
        }
      })
        .subscribe((res: any) => {
          this.router.navigate(['/category/list']).then(r => {
          });
        });
    }
  }

  onBack(): void {
    this.router.navigate(['/category/list']).then(r => {
    });
  }

}
