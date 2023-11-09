import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './UI/app/app.config';
import { AppComponent } from './UI/app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
