import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-posts',
  standalone: false,
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  filteredPosts: any[] = [];
  searchQuery: string = '';
  selectedCategory: string = '';
  selectedPrice: string = 'All Prices';
  sortOrder: string = 'Ascending';
  currentPage: number = 1;
  pageSize: number = 4;

  Math = Math;

  ngOnInit(): void {
    this.fetchPosts(); // أول ما الصفحة تفتح بنجيب المنشورات
  }

  // هاي الدالة بتجيب المنشورات من الـAPI
  async fetchPosts() {
    try {
      const response = await axios.get('http://localhost:8080/api/posts'); // من هون بنبعث طلب للـAPI
      this.posts = response.data; // بنخزن البيانات اللي جت من الـAPI في المتغير
      this.applyFilters(); // بعد ما جبنا البيانات، بنطبق الفلاتر
    } catch (error) {
      console.error('Error fetching posts:', error); // إذا صار في مشكلة، منعرض الخطأ
    }
  }

  // هاي الدالة بتطبق الفلاتر على المنشورات
  applyFilters() {
    let result = [...this.posts]; // بنعمل نسخة من المنشورات عشان نعدل عليها بدون ما نغير الأصل

    // 1. فلترة حسب نص البحث
    if (this.searchQuery) {
      result = result.filter((post) =>
        post.subject.toLowerCase().includes(this.searchQuery.toLowerCase()) // منفلتر المنشورات حسب النص اللي دخلناه
      );
    }

    // 2. فلترة حسب الفئة
    if (this.selectedCategory) {
      result = result.filter((post) => post.category === this.selectedCategory); // منفلتر حسب الفئة اللي اختارها المستخدم
    }

    // 3. فلترة حسب السعر
    result = result.filter((post) => {
      if (this.selectedPrice === 'Less than 10 JD') return post.price < 10;
      if (this.selectedPrice === '10 JD') return post.price === 10;
      if (this.selectedPrice === 'More than 10 JD') return post.price > 10;
      return true; // إذا ما كان فيه فلتر سعر محدد، بنعرض كل المنشورات
    });

    // 4. ترتيب حسب السعر
    result.sort((a, b) =>
      this.sortOrder === 'Ascending' ? a.price - b.price : b.price - a.price // بنرتب المنشورات حسب السعر
    );

    this.filteredPosts = result; // بنخزن المنشورات المفلترة في متغير جديد
  }

  // هاي الدالة بتتفعّل لما المستخدم يكتب في البحث
  handleSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value; // بنحدث قيمة البحث
    this.applyFilters(); // وبعدين بنطبق الفلاتر
  }

  // هاي الدالة بتغير الصفحة لما المستخدم يضغط على رقم صفحة مختلف
  changePage(page: number) {
    this.currentPage = page; // بنغير الصفحة الحالية
  }

  // هاي بتعطي المنشورات اللي بدنا نعرضها في الصفحة الحالية
  get paginatedPosts() {
    const start = (this.currentPage - 1) * this.pageSize; // بنحدد بداية المنشورات في الصفحة
    return this.filteredPosts.slice(start, start + this.pageSize); // منعرض المنشورات للصفحة الحالية
  }
}
