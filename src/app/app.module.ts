// app.module.ts
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [AppComponent], // ❌ pas de Home/NotFound s'ils sont standalone
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    // ✅ fournit NGX_ECHARTS_CONFIG globalement
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
