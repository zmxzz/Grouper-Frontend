import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatDialogModule,
  MatOptionModule,
  MatSelectModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { WavesModule, InputsModule, ButtonsModule, IconsModule } from 'angular-bootstrap-md'

import { Constants } from './constants';

import { UserService } from '../service/user.service';
import { ActivityService } from '../service/activity.service'; 
import { NavigationService } from '../service/navigation.service';

import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index-page/index-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TopNavBarComponent } from './reusable-components/top-nav-bar/top-nav-bar.component';
import { ActivityBoxComponent } from './reusable-components/activity-box/activity-box.component';
import { ActivityCardComponent} from './reusable-components/activity-card/activity-card.component';
import { BasicInfoCardComponent } from './reusable-components/basic-info-card/basic-info-card.component';
import { ActivityPostDialogComponent } from './reusable-components/activity-post-dialog/activity-post-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HomePageComponent,
    TopNavBarComponent,
    ActivityBoxComponent,
    ActivityCardComponent,
    BasicInfoCardComponent,
    ActivityPostDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    IconsModule,
    WavesModule, 
    InputsModule, 
    ButtonsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  entryComponents: [
    ActivityPostDialogComponent
  ],
  providers: [
    Constants,
    UserService,
    ActivityService,
    NavigationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
