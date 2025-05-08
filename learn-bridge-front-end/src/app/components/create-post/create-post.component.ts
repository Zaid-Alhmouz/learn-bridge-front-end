import { Component } from '@angular/core';
import { PostService } from '../../shared/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
  categories: string[] = ['IT', 'SCIENCE', 'LANGUAGES', 'MEDICAL'];

  formData = {
    subject: '',
    category: '',
    content: '',
    price: null as number | null,
  };

  showError = false;

  constructor(private postService: PostService) {}

  onSubmit() {
    if (
      !this.formData.subject ||
      !this.formData.category ||
      !this.formData.content ||
      !this.formData.price ||
      this.formData.price <= 0
    ) {
      this.showError = true;
      return;
    }

    this.showError = false;

    this.postService.createPost(this.formData).subscribe({
      next: () => {
        alert('Post created successfully!');
        this.postService.fetchPosts();  // تحديث البوستات بعد النشر
      },
      error: (err) => console.error('Error creating post', err),
    });
  }
}
