import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  constructor(public postService: PostService) { }
  posts: Post[] = []
  private postsSub!: Subscription;
  ngOnInit(): void {
    this.postService.getPost()
    this.postsSub = this.postService.getPostUpdatedListener()
    .subscribe((posts: Post[]) => {
      this.posts =  posts
    })
  }

  // posts = [
  //   {title: "First Post", content:"This is a first Post of content"},
  //   {title: "Second Post", content:"This is a Second Post of content"},
  //   {title: "Third Post", content:"This is a Third Post of content"},
  // ]

   ngOnDestroy(): void {
     this.postsSub.unsubscribe()
   }

   onDelete(Id:string){
    this.postService.deletePost(Id)
   }

}
