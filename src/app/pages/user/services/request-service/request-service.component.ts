import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-request-service',
  imports: [RouterLink, ReactiveFormsModule],
  standalone: true,
  templateUrl: './request-service.component.html',
  styleUrl: './request-service.component.css',
})
export class RequestServiceComponent {
  private router = inject(Router);
  step = 0;
  communityForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  nextStep() {
    this.step++;
  }

  prevStep() {
    if (this.step === 0) {
      this.router.navigate(['/services']);
    } else {
      this.step--;
    }
  }

  setButtonText() {
    switch (this.step) {
      case 0:
        return 'Next';
      case 1:
        return 'Accept';
      case 2:
        return 'Submit';
      default:
        return '';
    }
  }
}
