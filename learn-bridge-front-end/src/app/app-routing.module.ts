import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { AddCardComponent } from './components/add-card/add-card.component';

import { InstructorBioComponent } from './components/instructor-bio/instructor-bio.component';

import { EditPostComponent } from './components/edit-post/edit-post.component';
import { ReportComponent } from './components/report/report.component';
import { ChatComponent } from './components/chat/chat.component';
import { AddRatingComponent } from './components/add-rating/add-rating.component';
import { PendingComponent } from './components/pending/pending.component';


const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'home', component: HomeComponent, title: 'Home' },
      {
        path: 'find-instructor',
        component: FindInstructorComponent,
        title: 'Find Instructor',
      },
      { path: 'my-posts', component: MyPostsComponent, title: 'My Posts' },
      {
        path: 'create-post',
        component: CreatePostComponent,
        title: 'CreatePost',
      },
      {
        path: 'instructor-bio',
        component: InstructorBioComponent,
        title: 'Instructor Bio',
      },
      { path: 'posts', component: PostsComponent, title: 'Posts' },
      { path: 'add-card', component: AddCardComponent, title: 'Add Card' },
      { path: 'payment', component: PaymentComponent, title: 'Payment' },
      { path: 'Edit-post', component: EditPostComponent, title: 'Edit-post' },
      { path: 'report', component: ReportComponent, title: 'report' },
      { path: 'chat', component: ChatComponent, title: 'chat' },
      { path: 'add-rating', component: AddRatingComponent, title: 'add-rating' },
      { path: 'pending', component: PendingComponent, title: 'pending' },
      
    ],
  },
  {
    path: 'blank',
    component: BlankLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'Home' },
      { path: 'posts', component: PostsComponent, title: 'Posts' },
    ],
  },

  { path: '**', component: NotFoundComponent, title: 'NotFound' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
