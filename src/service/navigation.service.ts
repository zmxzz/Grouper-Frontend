// The service helps communication between AppComponent and TopNavBarComponent
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class NavigationService {
    navigationPage = new BehaviorSubject<string>('');

    changePage(message: string): void {
      this.navigationPage.next(message);
    }

    getPage(): Observable<string> {
        return this.navigationPage.asObservable();
    }
}