import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ui-loader',
  templateUrl: './ui-loader.component.html',
  styleUrls: ['./ui-loader.component.scss']
})
export class UILoaderComponent {
  @Input() message = 'Загрузка...';

}
