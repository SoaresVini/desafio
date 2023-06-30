import { User } from './../model/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API = 'http://localhost:3000/users'

  constructor(private http: HttpClient) {
   }

  buscar(): Observable<User[]> {
    return this.http.get<User[]>(this.API)
  }

  criar(user: User): Observable<User> {
    return this.http.post<User>(this.API, user)
  }

  editar(user: User): Observable<User>{
    const url = `${this.API}/${user.id}`
    return this.http.put<User>(url, user)
  }

  buscarUser(id: number): Observable<User>{
    const url = `${this.API}/${id}`
    return this.http.get<User>(url)
  }

  deletar(id: number): Observable<User>{
    const url = `${this.API}/${id}`
    return this.http.delete<User>(url)
  }



}


