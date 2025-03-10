import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { systemsList } from '../../../core/constants/constants';

@Component({
  selector: 'app-services',
  imports: [RouterLink, RouterModule],
  standalone: true,
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  systemsList = systemsList;
  user: any = {};
  approvedSystems: string[] = [];

  private auth = inject(AuthService);

  ngOnInit(): void {
    this.auth.getUser().subscribe((user) => {
      this.user = user;
      if (this.user?.user_metadata?.systems) {
        const approvedSystemIDs = this.user.user_metadata.systems.approved;
        this.approvedSystems = this.systemsList
          .filter((system) => approvedSystemIDs.includes(system.id))
          .map((system) => system.name);
      }
    });
  }
}
