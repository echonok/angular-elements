import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { AlertComponent } from './alert/alert.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-elements';
  content: any = null;

  constructor(
    injector: Injector,
    domSanitizer: DomSanitizer,
  ) {
    const AlertEl = createCustomElement(AlertComponent, { injector });
    customElements.define('my-alert', AlertEl);
    setTimeout(() => {
      this.content = '<p>my pa</p>'
    }, 2_000);
    setTimeout(() => {
      this.content = domSanitizer.bypassSecurityTrustHtml('<my-alert message="new message"></my-alert>');
    }, 4_000);

  }
}
