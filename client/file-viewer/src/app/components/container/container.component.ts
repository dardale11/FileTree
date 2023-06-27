import { Component, OnInit } from '@angular/core';
import FileSystemNode from 'src/app/interfaces/file-system-node';
import { ApiService } from 'src/app/services/api/api.service';
import { CacheService } from 'src/app/services/cache-service/cache.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent implements OnInit {
  data: FileSystemNode[] = [];
  completeTree: FileSystemNode[] = [];

  constructor(
    private apiService: ApiService,
    private cacheService: CacheService
  ) {}

  ngOnInit(): void {
    this.apiService.search().subscribe({
      next: (data) => {
        this.completeTree = data;
        this.data = data;
      },
      error: (error) => {
        console.error('An error occurred during first data fetch:', error);
      },
    });
  }

  handleSearch(searchTerm: string) {
    // empty search bar
    if (searchTerm?.length === 0) {
      this.data = this.completeTree;
    } else {
      // check if stored Cache
      const cachedData = this.cacheService.get(searchTerm);
      if (cachedData.length > 0) {
        this.data = cachedData;
      }
      // fetch from API
      else {
        this.apiService.search(searchTerm).subscribe({
          next: (data) => {
            this.data = data;
          },
          error: (error) => {
            console.error('An error occurred during query:', error);
          },
        });
      }
    }
  }
}
