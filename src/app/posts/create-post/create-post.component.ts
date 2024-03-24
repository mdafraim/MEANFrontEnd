import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(public postService: PostService) { }

  ngOnInit(): void {
  }

  enterTitle = '';
  enterContent = '';

  onAddPost(form: NgForm){
    if(form.invalid){
      return;
    }
    this.postService.addedPost(form.value);
    form.resetForm()
  }

}
