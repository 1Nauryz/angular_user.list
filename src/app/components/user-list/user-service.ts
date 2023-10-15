import { Injectable } from '@angular/core';
import { ApiService } from '../../api.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: Observable<any[]> | undefined;

  constructor(private apiService: ApiService) {}

  addUser(user: any) {
    if (this.users) {
      this.users = this.users.pipe(
        map((existingUsers) => [...existingUsers, user])
      );
    }
  }
getUsersFromDB(): Observable<any[]> {
  console.log('DATA FROM DB');
  return this.apiService.getAllData().pipe(
    catchError((error) => {
      console.error('Error fetching data: ', error);
      return [];
    })
  );
}

  // getUsersFromDB() {
  //   console.log('DATA FROM DB');
  //   console.log(this.apiService.getAllData())
  //   this.users = this.apiService.getAllData();
  // }
   getUsers(): Observable<any[]> | undefined {
    return this.users;
  }

  editUser(index: number, newUserDetails: any) {
    console.log('Temporary edit method without updating the list');
  }
}
