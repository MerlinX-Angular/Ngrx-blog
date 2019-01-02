import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StoreModule } from "@ngrx/store";
import { blogReducer } from './state/blog.reducer';
import { EffectsModule ,Actions } from "@ngrx/effects";
import { BlogEffect } from './state/blog.effect';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { BlogComponent } from './blog/blog.component';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ReversePipe } from './reverse.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateBlogComponent,
    BlogComponent,
    FooterComponent,
    NavBarComponent,
    EditBlogComponent,
    ReversePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({blog:blogReducer}),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([BlogEffect]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument(
      {
        name:"Blog devtools",
        maxAge:25,
        logOnly:environment.production
      }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
