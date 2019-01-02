import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { mergeMap, map, catchError} from "rxjs/operators";
import { Actions ,  Effect , ofType } from "@ngrx/effects";
import { InformationService } from "../information.service";
import * as blogActions from "./blog.action";

@Injectable()
export class BlogEffect {
  constructor(
    private actions: Actions,
    private infoService: InformationService
  ) {}

  // Load blogs
  @Effect()
  loadBlogs = this.actions.pipe(
    ofType(blogActions.BlogActionTypes.LOAD_BLOGS),
    mergeMap((action) =>
    this.infoService.getBlogs().pipe(
      map(blogs => new blogActions.LoadBlogsSuccess(blogs)),
      catchError(err => of(new blogActions.LoadBlogsFail(err)))
    ))
  )

  // Load blog
  @Effect()
  loadBlog: Observable<Action> = this.actions.pipe(
      ofType<any>(
      blogActions.BlogActionTypes.LOAD_BLOG
    ),
    mergeMap((action) =>
    this.infoService.getBlogById(action.payload).pipe(
      map(
        (blog) =>
        new blogActions.LoadBlogSuccess(blog)
      ),
      catchError(err => of(new blogActions.LoadBlogFail(err)
    )))));

    // Create blog
    @Effect()
    createBlog$= this.actions.pipe(
      ofType<any>(
        blogActions.BlogActionTypes.CREATE_BLOG
      ),
      map((action) => action.payload),
      mergeMap((blog) =>
      this.infoService.createBlog(blog).pipe(
        map(
          newBlog =>
          new blogActions.CreateBlogSuccess(newBlog)
        ),
        catchError(err => of(new blogActions.CreateBlogFail(err)))
      )
    )
  );

  // Update blog
  @Effect()
  updateBlog = this.actions.pipe(
    ofType<any>(
      blogActions.BlogActionTypes.UPDATE_BLOG
    ),
    map((action: blogActions.UpdateBlogSuccess) => action.payload),
    mergeMap((blog) =>
    this.infoService.updateBlog(blog).pipe(
      map(
        (updatedBlog) =>
        new blogActions.UpdateBlogSuccess({
          id: updatedBlog.id,
          changes: updatedBlog
        })
      ),
      catchError(err => of(new blogActions.UpdateBlogFail(err)))
    )
  )
);

// Delete blog
@Effect()
deleteBlog$ = this.actions.pipe(
  ofType(blogActions.BlogActionTypes.DELETE_BLOG),
  map((action:blogActions.DeleteBlog) => action.payload),
  mergeMap((id: number) =>
  this.infoService.deleteBlog(id).pipe(
    map(() => new blogActions.DeleteBlogSuccess(id)),
    catchError(err => of(new blogActions.DeleteBlogFail(err)))
  )
)
);
}
