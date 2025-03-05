import { Routes } from '@angular/router';
import { ServicesComponent } from './pages/user/services/services.component';
import { AccessComponent } from './pages/user/access/access.component';
import { PendingComponent } from './pages/user/pending/pending.component';

export const routes: Routes = [
    { path: '', redirectTo: '/services', pathMatch: 'full' },
    { path: 'services', component: ServicesComponent },
    { path: 'access', component: AccessComponent },
    { path: 'pending', component: PendingComponent },
];
