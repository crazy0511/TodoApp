import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


// Bắt đầu chạy ở đây 
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
