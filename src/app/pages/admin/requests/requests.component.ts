import { Component } from '@angular/core';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-requests',
  imports: [LoadingSpinnerComponent],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css',
})
export class RequestsComponent {
  accessSelected = false;
  loading = false;
  selectedAccessName = '';

  selectAccess(accessName: string): void {
    this.accessSelected = true;
    this.selectedAccessName = accessName;
  }
}
