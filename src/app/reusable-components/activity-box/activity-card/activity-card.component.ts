import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/service/user.service';
import { CommunicateService } from 'src/service/communicate.service';
import { StateService } from 'src/app/utils/state.service';
import { ActivityService } from 'src/service/activity.service';

@Component({
    selector: 'app-activity-card',
    templateUrl: './activity-card.component.html',
    styleUrls: ['./activity-card.component.css', '../../../app.component.css']
})
export class ActivityCardComponent implements OnInit{
    constructor(private userService: UserService, private communicateService: CommunicateService, private stateService: StateService, private activityService: ActivityService) { }
    @Input() activity: object;
    // Information of the activity
    name: string;
    category: string;
    time: string;
    introduction: string;
    address: string;
    spotRemain: number;
    organizer: string;
    participants: string[];
    activityId: string;

    // Initialize information field
    ngOnInit() {
        this.name = this.activity['activityName'];
        this.category = this.activity['category'];
        if (this.category !== undefined && this.category !== '') {
            this.category += ' | ';
        }
        this.time = this.activity['month'] + ' ' + this.activity['day'] + ', ' + this.activity['year'] + ', ' + this.convert(this.activity['hour'], this.activity['minute']);
        this.address = this.activity['address'] + ', ' + this.activity['city'] + ', ' + this.stateService.getAbbr(this.activity['state']);
        this.introduction = this.activity['introduction'];
        if (this.introduction === undefined || this.introduction === '') {
            this.introduction = 'Organizer is lazy and left nothing : (';
        }
        this.participants = this.activity['participants'];
        this.spotRemain = this.activity['groupSize'] - this.participants.length;
        this.activityId = this.activity['_id'];
    }

    // Convert two numbers into HH:MM
    convert(hour: number, minute: number): string {
        let hourStr: string = (hour < 10 ? '0' : '') + hour;
        let minuteStr: string = (minute < 10 ? '0' : '') + minute;
        return hourStr + ':' + minuteStr;
    }

    // Check if the user has joined the activity
    hasJoined(): boolean {
        return this.participants.includes(localStorage.getItem('userId'));
    }

    // Check if the user is the organizer
    isOrganizer(): boolean {
        return this.activity['organizer'] === localStorage.getItem('userId');
    }

    // Get text on the action button
    getAction(): string {
        if (this.isOrganizer()) {
            return 'Disband';
        }
        if (this.hasJoined()) {
            return 'Quit';
        }
        return 'Join';
    }

    // Perform action
    doAction(): void {
        if (this.isOrganizer()) {
            this.disband();
        }
        else if (this.hasJoined()) {
            // Do quit
            this.quit();
        }
        else {
            this.join();
        }
    }

    // Turn button's background color into gray if people is full
    getBackgroundColor(): string {
        // If the activity is expired or full, the color becomes grey
        if (!this.isOrganizer() && !this.hasJoined() && this.spotRemain == 0) {
            return 'grey';
        }
        else {
            return '#1DA1F2';
        }
    }

    // 
    async quit(): Promise<void> {
        if (!this.participants.includes(localStorage.getItem('userId'))) {
            return;
        }
        this.participants = this.participants.filter((value, index, array) => {
            return value !== localStorage.getItem('userId');
        });
        this.spotRemain++;
        try {
            await this.activityService.removeParticipant(this.activityId);
        } catch (error) {
            console.log(error);
            this.spotRemain--;
            this.participants.push(localStorage.getItem('userId'));
        }
    }

    // Call joinActivity service in userService
    async join(): Promise<void> {
        // Check if there is spot available to join
        if (this.spotRemain <= 0) {
            return;
        }
        // Put self into participants' list and send post request to avoid lagging from server
        this.participants.push(localStorage.getItem('userId'));
        this.spotRemain--;
        try {
            await this.activityService.addParticipant(this.activityId);
        } catch (error) {
            // If the request failed, meaning the user failed to join the service
            console.log(error);
            this.spotRemain++;
            this.participants.pop();
        }
    }

    // call disbandActivity service in userService
    async disband(): Promise<void> {
        this.communicateService.removeActivity(this.activity['_id']);
        try {
            this.userService.disbandActivity(this.activity['_id'])            
        } catch (error) {
            alert(error);
        }
    }


}