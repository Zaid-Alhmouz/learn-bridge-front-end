import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsSubject = new BehaviorSubject<any[]>([]);
  posts$ = this.postsSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchPosts() {
    this.http.get<any[]>('http://localhost:8080/api/posts/favourite-category', { withCredentials: true })
      .subscribe(posts => {
        this.postsSubject.next(posts);
      });
  }

  createPost(postData: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/posts/create-post', postData, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
  }
}
