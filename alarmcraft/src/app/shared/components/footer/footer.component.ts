import { Component, Input } from '@angular/core';

import { Alerts } from '../../models/alerts';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @Input() recentAlarmAdd!:Alerts;
}
