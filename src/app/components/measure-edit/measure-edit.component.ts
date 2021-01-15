import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-measure-edit',
  templateUrl: './measure-edit.component.html',
  styleUrls: ['./measure-edit.component.scss']
})
export class MeasureEditComponent implements OnInit {
  public id: any;
  public token: any;
  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    name_en: new FormControl('', Validators.required),
    base_unit: new FormGroup({
      name: new FormControl('', Validators.required),
      name_en: new FormControl('', Validators.required),
      display_name: new FormControl(''),
    }),
  });

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    public router: Router,
  ) {
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('category_token');
    this.route.params.subscribe((data) => {
      this.id = data.id;
    });
    if (this.id !== 'add') {
      this.http.get('/api/measure_unit_group/' + this.id, {params: {_with: 'measureUnits,baseUnit', token: this.token}})
        .subscribe((res: any) => {
          this.profileForm.patchValue({
            name: res.data.name,
            name_en: res.data.name_en,
            base_unit: {
              name: res.data.base_unit.name,
              name_en: res.data.base_unit.name_en,
              display_name: res.data.base_unit.display_name,
            }
          });
        });
    }
  }

  onSubmit(): void {
    if (this.id === 'add') {
      // tslint:disable-next-line:max-line-length
      this.http.post('/api/measure_unit_group?_with=measureUnits,baseUnit', this.profileForm.value, {
        params: {
          _with: 'measureUnits,baseUnit',
          token: this.token
        }
      })
        .subscribe((res: any) => {
          this.router.navigate(['/category/measure']).then(r => {
          });
        });
    } else {
      // tslint:disable-next-line:max-line-length
      this.http.put('/api/measure_unit_group/' + this.id, this.profileForm.value, {
        params: {
          _with: 'measureUnits,baseUnit',
          token: this.token
        }
      })
        .subscribe((res: any) => {
          this.router.navigate(['/category/measure']).then(r => {
          });
        });
    }
  }

  onBack(): void {
    this.router.navigate(['/category/measure']).then(r => {
    });
  }
}
