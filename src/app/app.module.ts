import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import { ContainerComponent } from './container/container.component';
import { CodificationService } from './codification.service';
import { TablesInterSegComponent } from './tables-inter-seg/tables-inter-seg.component';
import { TextComponent } from './text/text.component';
import { CardTableComponent } from './card-table/card-table.component';
import { DecodificationService } from './decodification.service';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FormComponent,
    ContainerComponent,
    TablesInterSegComponent,
    TextComponent,
    CardTableComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    CodificationService,
    DecodificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
