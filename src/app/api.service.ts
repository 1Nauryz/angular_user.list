import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private _http: HttpClient) {}
  apiUrl = 'http://localhost:3000/user';

  getAllData(): Observable<any[]> {
  return this._http.get<any[]>(this.apiUrl); // Specify the response type
}

  getUser(id: number): Observable<any> {
    return this._http.get(`${this.apiUrl}/${id}`);
  }

  createUser(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}`, data);
  }
}
