import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatRadioModule,
  MatInputModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatDialogModule,
  MatOptionModule,
  MatSelectModule
} from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { WavesModule, InputsModule, ButtonsModule, IconsModule } from 'angular-bootstrap-md'

import { StateService } from './utils/state.service';
import { InputOptionService } from './utils/input-option.service';
import { FileTypeService } from './utils/file-type.service';

import { FileService } from '../service/file.service';
import { UserService } from '../service/user.service';
import { MomentService } from '../service/moment.service';
import { ActivityService } from '../service/activity.service'; 
import { CommunicateService } from '../service/communicate.service';
import { ObjectBuilderService } from '../service/object-builder.service';

import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index-page/index-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TopNavBarComponent } from './reusable-components/top-nav-bar/top-nav-bar.component';
import { ActivityBoxComponent } from './reusable-components/activity-box/activity-box.component';
import { ActivityCardComponent} from './reusable-components/activity-card/activity-card.component';
import { BasicInfoCardComponent } from './reusable-components/basic-info-card/basic-info-card.component';
import { MomentPostDialogComponent } from './reusable-components/moment-post-dialog/moment-post-dialog.component';
import { ActivityPostDialogComponent } from './reusable-components/activity-post-dialog/activity-post-dialog.component';
import { FriendSuggestionBoxComponent } from './reusable-components/friend-suggestion-box/friend-suggestion-box.component';
import { FriendSuggestionCardComponent } from './reusable-components/friend-suggestion-card/friend-suggestion-card.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HomePageComponent,
    TopNavBarComponent,
    ActivityBoxComponent,
    ActivityCardComponent,
    BasicInfoCardComponent,
    MomentPostDialogComponent,
    ActivityPostDialogComponent,
    FriendSuggestionBoxComponent,
    FriendSuggestionCardComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatRadioModule,
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
    ActivityPostDialogComponent,
    MomentPostDialogComponent
  ],
  providers: [
    UserService,
    FileService,
    StateService,
    MomentService,
    ActivityService,
    FileTypeService,
    CommunicateService,
    InputOptionService,
    ObjectBuilderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
