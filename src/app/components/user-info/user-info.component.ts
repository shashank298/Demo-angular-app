import { Component, Input } from '@angular/core';
import { User } from '../../Model/User';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent {
  @Input('data') users: User[];
  constructor() {}
}
