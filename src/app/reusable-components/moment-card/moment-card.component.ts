import { Component, Input, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FileService } from 'src/service/file.service';
import { UserService } from 'src/service/user.service';
import { CommentPostDialogComponent } from '../comment-post-dialog/comment-post-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-moment-card',
    templateUrl: './moment-card.component.html',
    styleUrls: ['./moment-card.component.css']
})
export class MomentCardComponent implements OnInit {
    constructor(private userService: UserService,private fileService: FileService, private dialog: MatDialog) { }

    @ViewChild('changeButton', {static: false}) private changeButton: ElementRef; // Used to get rid of selected color comment when closed commentPostDialog
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
            for (let i = 0; i < this.images.length; i++) {
                this.createImageFromBlob(this.images[i]);
            }
        } catch (error) {
            console.log(error);   
        }
    }

    // Like a moment post
    async like() {
        // If not success, remove user from the like list
        this.momentInfo.likes.push(localStorage.getItem('userId'));
        try {
            await this.userService.likeMoment(this.momentInfo._id);            
        } catch (error) {
            this.momentInfo.likes = this.momentInfo.likes.filter((value) => {
                value !== localStorage.getItem('userId');
            });
        }
    }

    // Unlike a moment post
    async unlike() {
        // If not success, put user back to the likes list
        this.momentInfo.likes = this.momentInfo.likes.filter((value) => {
            value !== localStorage.getItem('userId');
        });
        try {
            await this.userService.unlikeMoment(this.momentInfo._id);
        } catch (error) {
            this.momentInfo.like.push(localStorage.getItem('userId'));
        }
    }
    // Open a comment dialog
    comment() {
        let dialogRef = this.dialog.open(CommentPostDialogComponent, {
            width: '500px',
            data: {momentInfo: this.momentInfo, firstname: this.firstname, lastname: this.lastname, username: this.username}
        });
          // After closed, get rid of the selected background color
        dialogRef.afterClosed().subscribe((result) => {
            this.changeButton['_elementRef'].nativeElement
                .classList.remove('cdk-program-focused');
        });
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