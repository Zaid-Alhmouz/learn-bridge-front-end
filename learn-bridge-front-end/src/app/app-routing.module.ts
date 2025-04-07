import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';
import { FindInstructorComponent } from './components/find-instructor/find-instructor.component';
import { PostsComponent } from './components/posts/posts.component';
import { PaymentComponent } from './components/payment/payment.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreatePostComponent } from './components/create-post/create-post.component';


const routes: Routes = [

  {
    path: '', component: AuthLayoutComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'home', component: HomeComponent, title: "Home" },
      { path: 'findinstructor', component: FindInstructorComponent, title: "Find Instructor" },
      { path: 'posts', component: PostsComponent, title: "Posts" },
    ]
  },
  {
    path: 'blank', component: BlankLayoutComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: "Home" },
      { path: 'findinstructor', component: FindInstructorComponent, title: "Find Instructor" },
      { path: 'posts', component: PostsComponent, title: "Posts" },
      { path: 'payment', component: PaymentComponent, title: "Payment" },
      { path: 'myposts', component: MyPostsComponent, title: "Myposts" },
      { path: 'createpost', component: CreatePostComponent, title: "CreatePost" },
    ]
  },

  { path: '**', component: NotFoundComponent, title: 'NotFound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
