import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Blog from '../state/blog.action';
import { Store } from "@ngrx/store";
import * as fromBlog from '../state/blog.reducer';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit,OnDestroy {
  id;
  profile;
  link;
  subBlog:Subscription;
  constructor(private route:ActivatedRoute,private store:Store<any>) { }

  ngOnInit() {
    this.route.paramMap.subscribe( id => { this.id = id.get('id') })
    const link = this.store.select(fromBlog.getCurrentBlog)
    this.subBlog = link.subscribe(profile => {this.profile = profile})
  }

  ngOnDestroy(){
    this.subBlog.unsubscribe();
  }
}
