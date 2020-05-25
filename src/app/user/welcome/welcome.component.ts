import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/IUser';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  user: IUser;
  loginProccess = false;
  error = false;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    // fake login
    this.user = {
      username: 'juanpablo',
      email: 'juanpablo@no.com',
      password: 'juanpablo'
    };
  }

  login() {
    // login user
    this.loginProccess = true;
    this.userService.login(this.user).subscribe(
      (resp: any) => {
        console.log(resp);
        this.loginProccess = false;
        this.error = !resp;
      },
      (err: any) => {
        console.log('err', err);
        this.loginProccess = false;
      }
    );
  }
}
