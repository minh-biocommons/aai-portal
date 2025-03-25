import { Component } from '@angular/core';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-revoked',
  imports: [LoadingSpinnerComponent],
  templateUrl: './revoked.component.html',
  styleUrl: './revoked.component.css',
})
export class RevokedComponent {
  revokedUserSelected = false;
  loading = false;
  selectedRevokedUserName = '';

  selectRevokedUser(revokedUserName: string): void {
    this.revokedUserSelected = true;
    this.selectedRevokedUserName = revokedUserName;
  }
}
