import { Component } from '@angular/core';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-list-users',
  imports: [LoadingSpinnerComponent],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css',
})
export class ListUsersComponent {
  groupSelected = false;
  loading = false;
  selectedGroupName = '';

  selectGroup(groupName: string): void {
    this.groupSelected = true;
    this.selectedGroupName = groupName;
  }
}
