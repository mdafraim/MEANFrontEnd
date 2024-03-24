import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  private posts:Post[] = [];
  private postsUpdated = new Subject<Post[]>(); 

  getPost(){
    this.http.get<{message:string, posts:Post[]}>('http://localhost:3000/api/posts')
    .pipe(map((postData) => {
      return postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          _id: post._id
        }
      })
    }))
    .subscribe((transformPost) => {
       this.posts = transformPost;
       this.postsUpdated.next([...this.posts]);
    })
  }

  getPostUpdatedListener(){
    return this.postsUpdated.asObservable();
  }

  addedPost(post:any){
    // const post: Post = {_id:string, title:title, content:content};
    this.http.post<{message: string}>('http://localhost:3000/api/posts',post)
    .subscribe((responseData) => {
      console.log(responseData);  
      this.posts.push(post);
      this.postsUpdated.next([...this.posts])
    })
  }
  deletePost(Id:string){
    this.http.delete('http://localhost:3000/api/posts/' + Id)
    .subscribe(() => {
      const updatedPost = this.posts.filter(post => post._id !== Id);
      this.posts = updatedPost;
      this.postsUpdated.next([...this.posts])
    })
  }
}
