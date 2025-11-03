import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teams',
  standalone: true,
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
  imports: [IonicModule, CommonModule],
})
export class TeamsPage {
  equipos = [
    { name: 'Barcelona SC', city: 'Guayaquil' },
    { name: 'Emelec SC', city: 'Guayaquil' },
    { name: 'Liga SC', city: 'Quito' },
    { name: 'Independiente del Valle', city: 'Sangolquí' },
  ];
}
