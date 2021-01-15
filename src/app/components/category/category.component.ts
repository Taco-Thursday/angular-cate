import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public id: any;
  public token: any;
  cateList = ['原料分类', '原料添加', '计量单位组'];
  cateSelected = 0;
  users = {};

  constructor(
    public router: Router,
    private i18n: TranslateService,
    private http: HttpClient,
  ) {
    // 翻译服务
    this.i18n.get('app.welcome').subscribe((res: string) => {
    });
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('category_token');
    this.users = JSON.parse(localStorage.getItem('Cages__user') as string);
  }

  cateChange(id: any): void {
    this.cateSelected = id;
    if (this.cateSelected === 0) {
      this.router.navigate(['/category/list']).then(r => {
      });
    } else if (this.cateSelected === 1) {
      this.router.navigate(['/category/ingredient/add']).then(r => {
      });
    } else {
      this.router.navigate(['/category/measure']).then(r => {
      });
    }
  }

  onCN(): void {
    this.i18n.use('en-US');
  }

  onUS(): void {
    this.i18n.use('zh-CN');
  }

  onLogOut(): void {
    this.http.post('/api/auth/logout', {
      token: this.token
    })
      .subscribe((res: any) => {
        localStorage.clear();
        this.router.navigate(['/login']).then(r => {
        });
      });
  }
}
