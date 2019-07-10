export class Constants {
    public years: number[] = [];
    public months: string[] = [
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
    public days: number[] = [];
    public hours: string[] = [];
    public minutes: string[] = [];

    constructor() {
        for (let i = 1970; i <= 2030; i++) {
            this.years.push(i);
        }
        for (let i = 1; i <= 31; i++) {
            this.days.push(i);
        }
        for (let i = 0; i < 24; i++) {
            if (i < 10) {
                this.hours.push('0' + i);
            }
            else {
                this.hours.push(i + '');
            }
        }
        for (let i = 0; i < 60; i++) {
            if (i < 10) {
                this.minutes.push('0' + i);
            }
            else {
                this.minutes.push(i + '');
            }
        }
        

    }

    public states: string[] = [
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
}