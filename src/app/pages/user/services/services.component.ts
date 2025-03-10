import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-services',
  imports: [RouterLink, RouterModule],
  standalone: true,
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  systemsList = [
    {
      id: 'TSI_SH',
      name: 'Threatened Species Initiative',
      url: 'https://threatenedspeciesinitiative.com',
    },
    {
      id: 'BPA_DP',
      name: 'Bioplatform Data Portal',
      url: 'https://data.bioplatforms.com',
    },
    {
      id: 'GX_AU',
      name: 'Galaxy Australia',
      url: 'https://usegalaxy.org.au',
    },
    {
      id: 'SBP',
      name: 'Structural Biology Platform',
      url: 'https://seqera.services.biocommons.org.au/login',
    },
  ];

  metadata: any = {};
  approvedSystems: string[] = [];
  private auth = inject(AuthService);

  ngOnInit(): void {
    this.metadata = this.auth.getUserMetadata();

    if (
      this.metadata &&
      this.metadata.user_metadata &&
      this.metadata.user_metadata.systems
    ) {
      const approvedSystemIds = this.metadata.user_metadata.systems.approved;
      this.approvedSystems = this.systemsList
        .filter((system) => approvedSystemIds.includes(system.id))
        .map((system) => system.name);
    }
  }
}
