import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/services/users/token-storage.service';
import { UsersService } from 'src/app/services/users/users.service';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  user: any = {};
  username: string;
  password: string;
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  private roles: string[];
  authority:string='';
  sub:string=null;
  token: string;
  @Input() error: string | null;
  constructor(private router: Router, private userService: UsersService, public toastr: ToastrService,private tokenStorage: TokenStorageService) { }
  invalidLogin = false
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
  ngOnInit() : void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.token=sessionStorage.getItem('auth-user')
      const tokenInfo = this.getDecodedAccessToken(this.token);
      this.roles[0] = tokenInfo.roles[0];
    }
  }
  ngOnDestroy() {
  }
  checkLogin() {
     (this.userService.authenticate(this.username, this.password).subscribe(
       data => {
         this.tokenStorage.saveToken(data.accessToken);
         this.tokenStorage.saveUser(data);
           /*A chaque fois on besoin du token */
           this.token=sessionStorage.getItem('auth-user');
           const tokenInfo = this.getDecodedAccessToken(this.token);
        
         if (tokenInfo.roles[0].authority==='ROLE_ADMIN') {  
           this.router.navigate(['admin/user-profile']);
           this.isLoggedIn = true;
           this.invalidLogin = false
         }
         else if (tokenInfo.roles[0].authority==='ROLE_AGENT')  {
           this.router.navigate(['agent/user-profile']);
           this.isLoggedIn = true;
           this.invalidLogin = false
         }
         else if (tokenInfo.roles[0].authority==='ROLE_TAXI')  {
          this.router.navigate(['taxi/user-profile']);
          this.isLoggedIn = true;
          this.invalidLogin = false
        }
       },
       error => {
         this.invalidLogin = true
         this.error = error.message;
         this.toastr.warning('Login Incorrecte ')
 
       }
     )
     );
   }

}
