import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import * as blogActions from '../state/blog.action';
import { Store } from "@ngrx/store";
import * as fromBlog from '../state/blog.reducer';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit,OnDestroy {
  id;
  blog;
  subBlog:Subscription;

  constructor(
    private store: Store<any>,
    private router:Router,
    private route:ActivatedRoute) { }

    ngOnInit() {
      this.route.paramMap.subscribe( id => { this.id = id.get('id') })
      this.store.dispatch(new blogActions.LoadBlog(this.id));

      const allInfo = this.store.select(
        fromBlog.getCurrentBlog
      );
    this.subBlog = allInfo.subscribe(blog => {this.blog = blog})
    }

    renewBlog(title,description,author,image,imageTitle,imageSubtitle) {
      const updatedBlog = {
        title: title,
        description: description,
        author: author,
        image: image,
        id:this.blog.id,
        imageTitle:imageTitle,
        imageSubtitle:imageSubtitle
      };

      this.store.dispatch(new blogActions.UpdateBlog(updatedBlog));
      this.router.navigate(['home'])
    }

    ngOnDestroy(){
      this.subBlog.unsubscribe();
    }
  }
