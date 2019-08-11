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
import { CommentService} from '../service/comment.service';
import { MomentService } from '../service/moment.service';
import { ActivityService } from '../service/activity.service'; 
import { CommunicateService } from '../service/communicate.service';
import { ObjectBuilderService } from '../service/object-builder.service';

import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index-page/index-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MomentPageComponent } from './pages/moment-page/moment-page.component';
import { NotificationPageComponent } from './pages/notification-page/notification-page.component';
import { MessagePageComponent } from './pages/message-page/message-page.component';
import { MomentBoxComponent } from './reusable-components/moment-box/moment-box.component';
import { MomentCardComponent } from './reusable-components/moment-box/moment-card/moment-card.component';
import { TopNavBarComponent } from './reusable-components/top-nav-bar/top-nav-bar.component';
import { ActivityBoxComponent } from './reusable-components/activity-box/activity-box.component';
import { ActivityCardComponent} from './reusable-components/activity-box/activity-card/activity-card.component';
import { NotificationBoxComponent } from './reusable-components/notification-box/notification-box.component';
import { NotificationCardComponent } from './reusable-components/notification-box/notification-card/notification-card.component';
import { BasicInfoCardComponent } from './reusable-components/basic-info-card/basic-info-card.component';
import { DialogCommentBarComponent } from './reusable-components/comment-post-dialog/dialog-comment-bar.component';
import { CommentPostDialogComponent } from './reusable-components/comment-post-dialog/comment-post-dialog.component';
import { MomentPostDialogComponent } from './reusable-components/moment-post-dialog/moment-post-dialog.component';
import { ActivityPostDialogComponent } from './reusable-components/activity-post-dialog/activity-post-dialog.component';
import { FriendSuggestionBoxComponent } from './reusable-components/friend-suggestion-box/friend-suggestion-box.component';
import { FriendSuggestionCardComponent } from './reusable-components/friend-suggestion-box/friend-suggestion-card/friend-suggestion-card.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HomePageComponent,
    MessagePageComponent,
    MomentPageComponent,
    NotificationPageComponent,
    MomentCardComponent,
    TopNavBarComponent,
    MomentBoxComponent,
    ActivityBoxComponent,
    ActivityCardComponent,
    NotificationBoxComponent,
    NotificationCardComponent,
    BasicInfoCardComponent,
    DialogCommentBarComponent,
    CommentPostDialogComponent,
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
    CommentPostDialogComponent,
    ActivityPostDialogComponent,
    MomentPostDialogComponent,
  ],
  providers: [
    UserService,
    FileService,
    StateService,
    MomentService,
    CommentService,
    ActivityService,
    FileTypeService,
    CommunicateService,
    InputOptionService,
    ObjectBuilderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
