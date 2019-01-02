import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

export enum BlogActionTypes {
  LOAD_BLOGS = "[Blog] Load Blogs",
  LOAD_BLOGS_SUCCESS = "[Blog] Load Blogs Success",
  LOAD_BLOGS_FAIL = "[Blog] Load Blogs Fail",
  LOAD_BLOG = "[Blog] Load Blog",
  LOAD_BLOG_SUCCESS = "[Blog] Load Blog Success",
  LOAD_BLOG_FAIL = "[Blog] Load Blog Fail",
  CREATE_BLOG = "[Blog] Create Blog",
  CREATE_BLOG_SUCCESS = "[Blog] Create Blog Success",
  CREATE_BLOG_FAIL = "[Blog] Create Blog Fail",
  UPDATE_BLOG = "[Blog] Update Blog",
  UPDATE_BLOG_SUCCESS = "[Blog] Update Blog Success",
  UPDATE_BLOG_FAIL = "[Blog] Update Blog Fail",
  DELETE_BLOG = "[Blog] Delete Blog",
  DELETE_BLOG_SUCCESS = "[Blog] Delete Blog Success",
  DELETE_BLOG_FAIL = "[Blog] Delete Blog Fail"
}

export class LoadBlogs implements Action {
  readonly type = BlogActionTypes.LOAD_BLOGS
}

export class LoadBlogsSuccess implements Action {
  readonly type = BlogActionTypes.LOAD_BLOGS_SUCCESS
  constructor(public payload){}
}

export class LoadBlogsFail implements Action {
  readonly type = BlogActionTypes.LOAD_BLOGS_FAIL
    constructor(public payload){}
}

export class LoadBlog implements Action {
  readonly type = BlogActionTypes.LOAD_BLOG;

  constructor(public payload: number) {}
}
export class LoadBlogSuccess implements Action {
  readonly type = BlogActionTypes.LOAD_BLOG_SUCCESS;

  constructor(public payload) {}
}
export class LoadBlogFail implements Action {
  readonly type = BlogActionTypes.LOAD_BLOG_FAIL;

  constructor(public payload: string) {}
}

// CREATE BLOG
export class CreateBlog implements Action {
  readonly type = BlogActionTypes.CREATE_BLOG;

  constructor(public payload) {}
}
export class CreateBlogSuccess implements Action {
  readonly type = BlogActionTypes.CREATE_BLOG_SUCCESS;

  constructor(public payload) {}
}
export class CreateBlogFail implements Action {
  readonly type = BlogActionTypes.CREATE_BLOG_FAIL;

  constructor(public payload: string) {}
}

// UPDATE BLOG
export class UpdateBlog implements Action {
  readonly type = BlogActionTypes.UPDATE_BLOG;

  constructor(public payload) {}
}
export class UpdateBlogSuccess implements Action {
  readonly type = BlogActionTypes.UPDATE_BLOG_SUCCESS;

  constructor(public payload: Update<any>) {}
}
export class UpdateBlogFail implements Action {
  readonly type = BlogActionTypes.UPDATE_BLOG_FAIL;

  constructor(public payload: string) {}
}

// DELETE BLOG
export class DeleteBlog implements Action {
  readonly type = BlogActionTypes.DELETE_BLOG;

  constructor(public payload: number) {}
}
export class DeleteBlogSuccess implements Action {
  readonly type = BlogActionTypes.DELETE_BLOG_SUCCESS;

  constructor(public payload: number) {}
}
export class DeleteBlogFail implements Action {
  readonly type = BlogActionTypes.DELETE_BLOG_FAIL;

  constructor(public payload: string) {}
}


export type Action = LoadBlogs | LoadBlogsSuccess | LoadBlogsFail  | LoadBlog
  | LoadBlogSuccess
  | LoadBlogFail
  | CreateBlog
  | CreateBlogSuccess
  | CreateBlogFail
  | UpdateBlog
  | UpdateBlogSuccess
  | UpdateBlogFail
  | DeleteBlog
  | DeleteBlogSuccess
  | DeleteBlogFail;
