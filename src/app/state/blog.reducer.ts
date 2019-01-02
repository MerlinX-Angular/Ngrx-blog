import * as blogActions from './blog.action';
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EntityState,EntityAdapter,createEntityAdapter} from "@ngrx/entity";

export interface BlogState extends EntityState<any>{
  selectedBlogId:number | null,
  loading: boolean;
  loaded: boolean;
  error: string;
}

export const blogAdapter:EntityAdapter<any> = createEntityAdapter();

export const defaultBlog = {
  ids: [],
  entities: {},
  selectedBlogId:null,
  loading:false,
  loaded:false,
  error: ""
}

export const initialState = blogAdapter.getInitialState(defaultBlog);

const getBlogFeatureState = createFeatureSelector<any>(
  "blog"
)

export function blogReducer(state = initialState, action:blogActions.Action) {
  switch(action.type){
    case blogActions.BlogActionTypes.LOAD_BLOGS:{
      return {
        ...state,
        loading:true
      }
    }

    case blogActions.BlogActionTypes.LOAD_BLOGS_SUCCESS:{
      return blogAdapter.addAll(action.payload,
        {
          ...state,
          loading:false,
          loaded:true,
        })
    }

    case blogActions.BlogActionTypes.CREATE_BLOG_SUCCESS:{
      return blogAdapter.addOne(action.payload,state)
    }
    case blogActions.BlogActionTypes.CREATE_BLOG_FAIL:{
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }
    case blogActions.BlogActionTypes.LOAD_BLOG_SUCCESS: {
      return blogAdapter.addOne(action.payload, {
        ...state,
        selectedBlogId: action.payload.id
      })
    }

    case blogActions.BlogActionTypes.LOAD_BLOG_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    case blogActions.BlogActionTypes.UPDATE_BLOG_SUCCESS: {
      return blogAdapter.updateOne(action.payload,state)
    }

    case blogActions.BlogActionTypes.UPDATE_BLOG_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    case blogActions.BlogActionTypes.DELETE_BLOG_SUCCESS: {
      return blogAdapter.removeOne(action.payload,state)
    }

    case blogActions.BlogActionTypes.DELETE_BLOG_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    default: {
      return state
    }

  }
}

export const getBlogs = createSelector(
  getBlogFeatureState, blogAdapter.getSelectors().selectAll
)

export const getBlogsLoading = createSelector(
  getBlogFeatureState,(state)=> state.loading
);

export const getBlogsLoaded = createSelector(
  getBlogFeatureState,
  (state: BlogState) => state.loaded
);

export const getError = createSelector(
  getBlogFeatureState,
  (state) => state.error
);

export const getCurrentBlogId = createSelector(
  getBlogFeatureState,
  (state) => state.selectedBlogId
);

export const getCurrentBlog = createSelector(
  getBlogFeatureState,
  getCurrentBlogId,
  state => state.entities[state.selectedBlogId]
);
