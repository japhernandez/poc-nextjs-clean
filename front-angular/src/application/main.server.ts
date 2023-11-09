import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './UI/app/app.component';
import { config } from './UI/app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
