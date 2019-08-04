import { Injectable } from '@angular/core';

@Injectable()
export class InputOptionService {
    private oneToTwentyEight: number[] = [];
    private oneToTwentyNine: number[] = [];
    private oneToThirty: number[] = [];
    private oneToThirtyOne: number[] = [];
    private years: number[] = [];
    private months: string[] = [
        'January', 
        'February', 
        'March', 
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    private days = {
        'January': this.oneToThirtyOne,
        'February': this.oneToTwentyEight, 
        'March': this.oneToThirtyOne, 
        'April': this.oneToThirty,
        'May': this.oneToThirtyOne,
        'June': this.oneToThirty,
        'July': this.oneToThirtyOne,
        'August': this.oneToThirtyOne,
        'September': this.oneToThirty,
        'October': this.oneToThirtyOne,
        'November': this.oneToThirty,
        'December': this.oneToThirtyOne
    };


    private hours: string[] = [];
    private minutes: string[] = [];

    private states: string[] = [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Pennsylvania',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming'
    ];

    constructor() {
        this.initYears();
        this.initHours();
        this.initMinutes();
        this.initNumbers(this.oneToTwentyEight, 28);
        this.initNumbers(this.oneToTwentyNine, 29);
        this.initNumbers(this.oneToThirty, 30);
        this.initNumbers(this.oneToThirtyOne, 31);
    }

    private initYears(): void {
        // Push 1970-2030 into years array
        for (let i = 1970; i <= 2030; i++) {
            this.years.push(i);
        }
    }

    private initHours(): void {
        // Push 00-23 into hours array
        for (let i = 0; i < 24; i++) {
            if (i < 10) {
                this.hours.push('0' + i);
            }
            else {
                this.hours.push(i + '');
            }
        }
    }

    private initMinutes(): void {
        // Push 00-59 into minutes array
        for (let i = 0; i < 60; i++) {
            if (i < 10) {
                this.minutes.push('0' + i);
            }
            else {
                this.minutes.push(i + '');
            }
        }
    }

    private initNumbers(numbers: number[], number: number): void {
        for (let i = 1; i <= number; i++) {
            numbers.push(i);
        }
    }

    public getYears(): number[] {
        return this.years;
    }

    public getMonths(): string[] {
        return this.months;
    }

    private isLeapYear(year: number): boolean {
        if (year % 100 == 0) {
            return year % 400 == 0;
        }
        return year % 4 == 0;
    }

    public getDays(year: number, month: string): number[] {
        if (year === null || month === '' || !this.isLeapYear(year) || month !== 'February') {
            return this.days[month]
        }
        else {
            return this.oneToTwentyNine;
        }
    }

    public getHours() {
        return this.hours;
    }

    public getMinutes() {
        return this.minutes;
    }
    
    public getStates() {
        return this.states;
    }


    
}