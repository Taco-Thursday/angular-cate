import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {HttpService} from '../../http-interceptors/HttpService';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [HttpService],
})
export class ListComponent implements OnInit {
  public anyList: any;
  public token: any;
  public dataSource: any;
  displayedColumns: string[] = ['分类编号', '分类名称', '分类英文名称', '操作'];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private http: HttpClient,
    public router: Router,
    private $http: HttpService,
  ) {
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('category_token');
    this.$http.get('/api/category', {params: {token: this.token}})
      .subscribe((res: any) => {
          this.anyList = res.data;
          this.dataSource = new MatTableDataSource(this.anyList);
          this.dataSource.paginator = this.paginator;
        }
      );
  }

  listDelete(id: any): void {
    this.http.delete('/api/category/' + id, {params: {token: this.token}})
      .subscribe((res: any) => {
        this.$http.get('/api/category', {params: {token: this.token}})
          .subscribe((item: any) => {
              this.anyList = item.data;
              this.dataSource = new MatTableDataSource(this.anyList);
              this.dataSource.paginator = this.paginator;
            }
          );
      });
  }

  listAdd(id: any): void {
    this.router.navigate(['/category/create'], {queryParams: {pid: id}}).then(r => {
    });
  }

  listEdit(id: any): void {
    this.router.navigate(['/category/list/' + id]).then(r => {
    });
  }
}
