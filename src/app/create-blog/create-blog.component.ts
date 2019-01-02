import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as blogActions from '../state/blog.action';
import { Store } from "@ngrx/store"

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {
blog;
  constructor(private router:Router,private store:Store<any>) {}

  ngOnInit() {}

  addBlog(title,description,author,image,imageTitle,imageSubtitle){
    const newBlog = {
      title:title,
      description:description,
      author:author,
      image:image,
      imageTitle:imageTitle,
      imageSubtitle:imageSubtitle
    }
    this.store.dispatch(new blogActions.CreateBlog(newBlog))
    this.router.navigate(['/home'])
  }

}
