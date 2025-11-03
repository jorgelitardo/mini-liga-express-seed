import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report-result',
  templateUrl: './report-result.page.html',
  styleUrls: ['./report-result.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ReportResultPage {
  resultados = [
    { id: 1, equipoLocal: 'Barcelona', equipoVisitante: 'Real Madrid', resultado: '2 - 1' },
    { id: 2, equipoLocal: 'Liverpool', equipoVisitante: 'Arsenal', resultado: '1 - 1' },
    { id: 3, equipoLocal: 'PSG', equipoVisitante: 'Bayern', resultado: '3 - 2' }
  ];
}
