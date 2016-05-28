import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {AppComponent} from './app.component'

import {DemoService} from './demo.service'

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  DemoService
]);
