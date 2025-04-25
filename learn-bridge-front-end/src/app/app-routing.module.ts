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
import { PendingReportsComponent } from './components/pendingreports/pendingreports.component';
import { ViewProfileComponent } from './components/viewprofile/viewprofile.component';
import { LearnerProfile } from './components/learner-profile/learner-profile.component';
import { SessionHistory } from './components/session-history/session-history.component';
import { InstructorProfile } from './components/Instructor-profile/Instructor-profile.component';
import { AgreementComponent } from './components/agreement/agreement.component';
import { PendingPostsComponent } from './components/pending-posts/pending-posts.component';
import { CancelPopUpComponent } from './components/cancel-popup/cancel-popup.component';
import { DeletePopUpComponent } from './components/delete-popup/delete-popup.component';
import { CompletePopUpComponent } from './components/complete-popup/complete-popup.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },

      // Faisal
      { path: 'home', component: HomeComponent, title: 'Home' },

      // Tamer
      {
        path: 'find-instructor',
        component: FindInstructorComponent,
        title: 'Find Instructor',
      },
      { path: 'my-posts', component: MyPostsComponent, title: 'My Posts' },
      { path: 'posts', component: PostsComponent, title: 'Posts' },
      {
        path: 'agreements',
        component: AgreementComponent,
        title: 'Agreement',
      },
      {
        path: 'create-post',
        component: CreatePostComponent,
        title: 'Create Post',
      },
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'register', component: RegisterComponent, title: 'Register' },
      {
        path: 'instructor-bio',
        component: InstructorBioComponent,
        title: 'Instructor Bio',
      },
      {
        path: 'instructor-profile',
        component: InstructorProfile,
        title: 'Instructor Profile',
      },
      {
        path: 'learner-profile',
        component: LearnerProfile,
        title: 'learner profile',
      },
      { path: 'add-card', component: AddCardComponent, title: 'Add Card' },
      {
        path: 'session-history',
        component: SessionHistory,
        title: 'Session History',
      },

      // Osama
      { path: 'payment', component: PaymentComponent, title: 'Payment' },
      { path: 'edit-post', component: EditPostComponent, title: 'Edit Post' },
      { path: 'report', component: ReportComponent, title: 'Report' },
      { path: 'chat', component: ChatComponent, title: 'Chat' },
      { path: 'pending-posts', component: PendingPostsComponent, title: 'Pending Posts' },
      { path: 'add-rating',component: AddRatingComponent,title: 'add-rating',},
      { path: 'pending-reports',component: PendingReportsComponent,title: 'Pending Reports',},
      { path: 'view-profile',component: ViewProfileComponent,title: 'View Profile',},
      { path: 'cancel-popup',component: CancelPopUpComponent,title: 'cancel-popup',},
      { path: 'delete-popup',component: DeletePopUpComponent,title: 'delete-popup',},
      { path: 'complete-popup',component: CompletePopUpComponent,title: 'complete-popup',}
      
      
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
