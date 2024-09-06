import { Component } from '@angular/core';
import { Contact } from '../models/contact.model';
import { ContactService } from './contact.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  contacts: Contact[] = [];
  selectedContact: Contact | null = null;

  isEditing = false;

  constructor(private contactsService: ContactService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if(!this.authService.getToken()){
      this.router.navigate(['/login']);
    }

    this.loadContacts();
  }

  loadContacts(): void {
    this.contactsService.getContacts().subscribe({
      next: (data) => this.contacts = data,
      error: (err) => console.error('Error loading contacts', err)
    });
  }

  selectContact(contact: Contact): void {
    this.selectedContact = { ...contact };
    this.isEditing = true;
  }

  addOrUpdateContact(contact: Contact): void {
    if (contact.id) {
      this.contactsService.updateContact(contact).subscribe({
        next: () => this.loadContacts(),
        error: (err) => console.error('Error updating contact', err)
      });
    } else {
      this.contactsService.addContact(contact).subscribe({
        next: () => this.loadContacts(),
        error: (err) => console.error('Error adding contact', err)
      });
    }
    this.isEditing = false;
    this.selectedContact = null;
  }

  deleteContact(id: number): void {
    this.contactsService.deleteContact(id).subscribe({
      next: () => this.loadContacts(),
      error: (err) => console.error('Error deleting contact', err)
    });
  }
}
