import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from './models/contact.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://localhost:7148/Contact';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getContacts(): Observable<Contact[]> {
    const userId = this.authService.getUserId();
    return this.http.get<Contact[]>(`${this.apiUrl}/GetContacts/${userId}`);
  }

  addContact(contact: Contact): Observable<Contact> {
    const userId = this.authService.getUserId();
    contact.userId = userId?.valueOf();
    return this.http.post<Contact>(`${this.apiUrl}/AddContact/`, contact);
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/UpdateContact/`, contact);
  }

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/DeleteContact/${id}`);
  }
}
