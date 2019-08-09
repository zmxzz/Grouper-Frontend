import { Component, Input, OnInit } from "@angular/core";
import { FileService } from 'src/service/file.service';
import { UserService } from 'src/service/user.service';

@Component({
    selector: 'app-moment-card',
    templateUrl: './moment-card.component.html',
    styleUrls: ['./moment-card.component.css']
})
export class MomentCardComponent implements OnInit {
    constructor(private userService: UserService,private fileService: FileService) { }

    @Input() momentInfo;
    images: any[] = [];
    urls = [];
    firstname: string;
    lastname: string;
    username: string;
    space: string = ' ';

    ngOnInit() {
        this.retrieveFiles();
        this.retrieveUser();
    }

    async retrieveUser() {
        try {
            // Try retreive user's names, assign it to values
            let userInfo = await this.userService.getUserBasicInformationById(this.momentInfo.user);
            console.log(userInfo);
            this.firstname = userInfo['firstname'];
            this.lastname = userInfo['lastname'];
            this.username = userInfo['username'];
        } catch (error) {
            console.log(error);
        }

    }

    async retrieveFiles() {
        // Read possible image blobs, display them by creating image from it
        let retrieveFiles: Promise<Blob>[] = [];
        for (let i = 0; i < this.momentInfo.images.length; i++) {
            retrieveFiles.push(this.fileService.downloadFile(this.momentInfo.images[i]))
        }
        try {
            this.images = await Promise.all(retrieveFiles);
            console.log(this.images);
            for (let i = 0; i < this.images.length; i++) {
                this.createImageFromBlob(this.images[i]);
            }
        } catch (error) {
            console.log(error);   
        }
    }

    // Like a moment post
    async like() {
        
    }

    hasLiked(): boolean {
        return this.momentInfo.likes.includes(localStorage.getItem('userId'));
    }

    createImageFromBlob(image: Blob) {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
           this.urls.push(reader.result);
        }, false);
     
        if (image) {
           reader.readAsDataURL(image);
        }
     }
}