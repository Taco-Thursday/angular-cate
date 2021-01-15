import {Component, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpService} from '../../http-interceptors/HttpService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [HttpService],
})
export class LoginComponent implements OnInit {
  hide = true;
  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    public router: Router,
    private $http: HttpService,
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.$http.post('/api/auth/login', this.profileForm.value)
      .subscribe((res: any) => {
        localStorage.setItem('category_token', res.token);
        this.router.navigate(['/category/list']).then(r => {
        });
      });
  }
}
