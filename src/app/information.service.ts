import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  url="http://localhost:3000/blogs"

  constructor(private http:HttpClient) {}

  getBlogs(){
    return  this.http.get(this.url);
  }

  createBlog(blog){
    return this.http.post(this.url, blog);
  }

  getBlogById(id){
    return this.http.get(this.url+`/${id}`);
  }

  updateBlog(blog) {
    return this.http.patch<any>(
      `${this.url}/${blog.id}`,
      blog
    );
  }

  deleteBlog(payload: number) {
    return this.http.delete(`${this.url}/${payload}`);
  }
}
