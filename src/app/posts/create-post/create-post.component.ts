import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  enterValue = '';
  newPost = 'NO CONTENT';
  onAddPost(){
    this.newPost = this.enterValue
  }

}
