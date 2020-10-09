import { Component, OnInit, HostListener } from '@angular/core';
import { User } from 'src/app/Model/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userName: string;
  emailId: string;
  users: User[];
  error: string;

  //This listens for a specific event change
  @HostListener('window:storage', ['$event'])
  onstorage(event: any) {
    if (localStorage.getItem('user')) {
      const localStorageData = JSON.parse(localStorage.getItem('user'));
      this.users = [...localStorageData];
    }
  }

  constructor(private userService: UserService) {}

  //This is to fetch data after inital render
  ngOnInit(): void {
    if (localStorage.getItem('user') !== null) {
      const localStorageData = this.userService.getData();
      this.users = [...localStorageData];
    }
  }

  //This is to post the data to Google sheets
  //On successful upload it will also write the same data to local storage.
  onSubmit() {
    if (
      this.userName === undefined ||
      this.emailId === undefined ||
      this.emailId.length === 0 ||
      this.emailId.length === 0
    ) {
      this.error = 'Please fill out all the details.';
    } else {
      this.error = '';
      const obj = {
        userName: this.userName,
        emailId: this.emailId,
      };
      this.userService.postData(obj).subscribe((res) => {
        console.log(res);
        alert(res.result)
      });
      this.emailId = '';
      this.userName = '';
      this.users = [...this.userService.getData()];
    }
  }
}
