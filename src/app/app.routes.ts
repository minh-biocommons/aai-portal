import { Routes } from '@angular/router';
import { ServicesComponent } from './pages/user/services/services.component';
import { AccessComponent } from './pages/user/access/access.component';
import { PendingComponent } from './pages/user/pending/pending.component';
import { RequestServiceComponent } from './pages/user/services/request-service/request-service.component';
import { NotFoundComponent } from './pages/shared/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/services', pathMatch: 'full' },
  {
    path: 'services',
    component: ServicesComponent,
    children: [
      {
        path: 'request',
        component: RequestServiceComponent,
      },
    ],
  },
  { path: 'access', component: AccessComponent },
  { path: 'pending', component: PendingComponent },
  { path: '**', component: NotFoundComponent },
];
