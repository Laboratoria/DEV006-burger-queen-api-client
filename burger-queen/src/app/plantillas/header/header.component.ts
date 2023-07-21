import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private storage: LocalStorageService,
    private authService: AuthServiceService) { }

  email = this.storage.getEmail();
  role = this.storage.getRoleUser();

  logout() {
    this.authService.logOut();
  }
}
