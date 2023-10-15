import { Component } from '@angular/core';
import { UserService } from './user-service';
import { Router } from "@angular/router";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list-component.component.html',
  styleUrls: ['./user-list-component.component.css']
})
export class UserListComponent {

    constructor(private userService: UserService, private router: Router) {}

  private url : string = "http://localhost:3000/user"

  ngOnInit() {
      fetch(this.url)
  .then((response) => response.json())
  .then(console.log);
  }
   editUser(index: number) {
    this.router.navigate(['/edit-user', index]);

  }


}
