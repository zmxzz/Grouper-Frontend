// The service helps communication between AppComponent and TopNavBarComponent
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class CommunicateService {
    navigationPageSubject = new BehaviorSubject<string>(null);
    removeActivitySubject = new BehaviorSubject<string>(null);
    removeSuggestionSubject = new BehaviorSubject<string>(null);
    postActivitySubject = new BehaviorSubject<object>(null);
    postMomentSubject = new BehaviorSubject<object>(null);

    postActivity(activity: object): void {
      this.postActivitySubject.next(activity);
    }

    getNewActivity(): Observable<object> {
      return this.postActivitySubject.asObservable();
    }

    postMoment(moment: object): void {
      this.postMomentSubject.next(moment);
    }

    getNewMoment(): Observable<object> {
      return this.postMomentSubject.asObservable();
    }

    removeActivity(activityId: string): void {
      this.removeActivitySubject.next(activityId);
    }

    getRemoveActivity(): Observable<string> {
      return this.removeActivitySubject.asObservable();
    }

    changePage(message: string): void {
      this.navigationPageSubject.next(message);
    }

    getPage(): Observable<string> {
      return this.navigationPageSubject.asObservable();
    }

    getRemoveSuggestion(): Observable<string> {
      return this.removeSuggestionSubject.asObservable();
    }

    removeSuggestion(userId: string): void {
      this.removeSuggestionSubject.next(userId);
    }
}