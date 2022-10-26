import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FrecuencyComponent } from './frecuency/frecuency.component';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import { ContainerComponent } from './container/container.component';
import { InfoQuantityComponent } from './info-quantity/info-quantity.component';
import { CodificationService } from './codification.service';
import { ToAsciiComponent } from './to-ascii/to-ascii.component';
import { ToBinaryComponent } from './to-binary/to-binary.component';
import { TablesInterSegComponent } from './tables-inter-seg/tables-inter-seg.component';
import { VoltageComponent } from './voltage/voltage.component';
import { PlotComponent } from './plot/plot.component';
import { TextComponent } from './text/text.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FrecuencyComponent,
    FormComponent,
    ContainerComponent,
    InfoQuantityComponent,
    ToAsciiComponent,
    ToBinaryComponent,
    TablesInterSegComponent,
    VoltageComponent,
    PlotComponent,
    TextComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [CodificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
