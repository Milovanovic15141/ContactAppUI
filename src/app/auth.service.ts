import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7148/Auth';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
  }

  saveToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  saveUserId(id: number) {
    localStorage.setItem('userId', id.toString());
  }

  getUserId(): number | null{
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
