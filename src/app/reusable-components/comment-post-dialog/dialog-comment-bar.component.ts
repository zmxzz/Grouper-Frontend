import { Component, Input, OnInit, Inject, APP_INITIALIZER } from "@angular/core";
import { CommentService } from 'src/service/comment.service';
import { UserService } from 'src/service/user.service';
@Component({
    selector: 'dialog-comment-bar',
    templateUrl: './dialog-comment-bar.component.html',
    styleUrls: ['./comment-post-dialog.component.css']
})
export class DialogCommentBarComponent implements OnInit {
    constructor(private commentService: CommentService, private userService: UserService) { }
    @Input() commentId: string;
    firstname: string;
    lastname: string;
    username: string;
    content: string;

    ngOnInit() {
        this.initialize();
    }

    async initialize() {
        try {
            let comment = await this.commentService.getComment(this.commentId);
            let commentPoster = await this.userService.getUserBasicInformationById(comment['user']);
            this.content = comment['content'];
            this.firstname = commentPoster['firstname'];
            this.lastname = commentPoster['lastname'];
            this.username = commentPoster['username'];
        } catch (error) { }
    }

}