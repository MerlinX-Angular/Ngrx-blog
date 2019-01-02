import { Component, OnInit,OnDestroy } from '@angular/core';
import { Store,select } from "@ngrx/store";
import * as Blog from '../state/blog.action';
import { Router } from '@angular/router';
import * as fromBlog from '../state/blog.reducer';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
  blogs;
  blogsArray;
  subBlog:Subscription;
  constructor(private store:Store<any>,private router:Router) { }

  ngOnInit() {
    this.store.dispatch(new Blog.LoadBlogs());
    this.blogs = this.store.pipe(select(fromBlog.getBlogs));
    this.subBlog =  this.blogs.subscribe(blogsArray => this.blogsArray = blogsArray)  }

    loadProfile(blog){
      this.store.dispatch(new Blog.LoadBlog(blog.id));
    }

    deleteBlog(blog){
      this.store.dispatch(new Blog.DeleteBlog(blog.id))
    }

    editBlog(blog){
      this.router.navigate(['/edit/'+blog.id])
    }
    ngOnDestroy(){
      this.subBlog.unsubscribe();
    }
  }
