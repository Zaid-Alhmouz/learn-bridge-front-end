import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-instructor',
  standalone: false,
  templateUrl: './find-instructor.component.html',
  styleUrl: './find-instructor.component.scss'
})
export class FindInstructorComponent implements OnInit {
  searchKeyword: string = '';
  instructors: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchInstructors(); // load all instructors by default
  }

  fetchInstructors() {
    // const params: any = {};
    // if (this.searchKeyword.trim()) {
    //   params.search = this.searchKeyword.trim();
    // }

    // this.http.get<any>('https://your-api-base-url.com/instructors', { params })
    //   .subscribe({
    //     next: (response) => {
    //       this.instructors = response.data;
    //     },
    //     error: (err) => {
    //       console.error('Error fetching instructors:', err);
    //     }
    //   });
  }
}
