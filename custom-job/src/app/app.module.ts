import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ViewComponent } from './components/view/view.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AgGridModule } from 'ag-grid-angular';
import { AddJobComponent } from './components/add-job/add-job.component';
import { EditJobComponent } from './components/edit-job/edit-job.component';
import { AddEditFormComponent } from './components/add-edit-form/add-edit-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddSectionFieldPopupComponent } from './components/popups/add-section-field-popup/add-section-field-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    NavbarComponent,
    AddJobComponent,
    EditJobComponent,
    AddEditFormComponent,
    AddSectionFieldPopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    AgGridModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
