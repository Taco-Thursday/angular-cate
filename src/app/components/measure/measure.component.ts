import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {HttpService} from '../../http-interceptors/HttpService';

@Component({
  selector: 'app-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.scss'],
  providers: [HttpService],
})
export class MeasureComponent implements OnInit {
  public token: any;
  public measureList: any;
  displayedColumns: string[] = ['名称', '英文名称', '基础计量单位', '操作'];
  dataSource: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private http: HttpClient,
    private $http: HttpService,
    public router: Router,
  ) {
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('category_token');
    this.$http.get('/api/measure_unit_group', {params: {_with: 'baseUnit', token: this.token}})
      .subscribe((res: any) => {
        this.measureList = res.data;
        this.dataSource = new MatTableDataSource(this.measureList);
        this.dataSource.paginator = this.paginator;
      });
  }

  // tslint:disable-next-line:typedef
  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.value.trim().toLowerCase();
  }

  measureEdit(id: any): void {
    this.router.navigate(['/category/measure/' + id]).then(r => {
    });
  }

  measureAdd(): void {
    this.router.navigate(['/category/measure/add']).then(r => {
    });
  }

  measureDelete(id: any): void {
    this.http.delete('/api/measure_unit_group/' + id, {params: {token: this.token}})
      .subscribe((res: any) => {
        this.http.get('/api/measure_unit_group', {params: {_with: 'baseUnit', token: this.token}})
          .subscribe((item: any) => {
            this.measureList = item.data;
            this.dataSource = new MatTableDataSource(this.measureList);
            this.dataSource.paginator = this.paginator;
          });
      });
  }
}

