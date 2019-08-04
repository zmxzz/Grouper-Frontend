import { Injectable } from '@angular/core';

@Injectable()
export class ObjectBuilderService {
    buildMoment(fileType: string, momentContent: string, fileUrls: string[]): object {
        let moment = {
            content: momentContent,
            images: fileType === 'image' ? fileUrls : [],
            video: fileType === 'video' ? fileUrls[0] : ''
        };
        return moment;
    }

    buildActivity(name: string, introduction: string, category: string, year: number, month: string, day: number, hour: string, minute: string, state: string, city: string, address: string, groupSize: string) {
        let activity = {
            activityName: name,
            introduction: introduction,
            category: category,
            year: year,
            month: month, 
            day: day,
            hour: parseInt(hour),
            minute: parseInt(minute),
            state: state,
            city: city,
            address: address,
            groupSize: parseInt(groupSize)
        }
        return activity;
    }
}