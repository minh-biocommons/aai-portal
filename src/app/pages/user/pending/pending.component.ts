import { Component, inject } from '@angular/core';
import { systemsList } from '../../../core/constants/constants';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-pending',
  imports: [],
  templateUrl: './pending.component.html',
  styleUrl: './pending.component.css',
})
export class PendingComponent {
  systemsList = systemsList;
  user: any = {};
  pendingSystems: string[] = [];

  private auth = inject(AuthService);

  ngOnInit(): void {
    this.auth.getUser().subscribe((user) => {
      this.user = user;
      if (this.user?.user_metadata?.systems?.requested) {
        const pendingSystemIDs = this.user.user_metadata.systems.requested;
        this.pendingSystems = this.systemsList
          .filter((system) => pendingSystemIDs.includes(system.id))
          .map((system) => system.name);
      }
    });
  }
}
