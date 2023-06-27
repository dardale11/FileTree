import { Injectable } from '@angular/core';
import CacheItem from 'src/app/interfaces/cache-item';
import FileSystemNode from 'src/app/interfaces/file-system-node';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cacheKeyPrefix = 'FileViewerCache_';

  get(cacheKey: string): FileSystemNode[] {
    const data = localStorage.getItem(this.getCacheKey(cacheKey));
    if (data) {
      const cacheItem: CacheItem = JSON.parse(data);
      if (cacheItem.expiresAt > Date.now()) {
        return cacheItem.value;
      } else {
        this.remove(cacheKey);
      }
    }
    return [];
  }

  set(
    cacheKey: string,
    value: FileSystemNode[],
    expirationMinutes: number = 60
  ): void {
    const cacheItem: CacheItem = {
      value,
      expiresAt: Date.now() + expirationMinutes * 60 * 1000,
    };
    localStorage.setItem(this.getCacheKey(cacheKey), JSON.stringify(cacheItem));
  }

  remove(cacheKey: string): void {
    localStorage.removeItem(this.getCacheKey(cacheKey));
  }

  private getCacheKey(cacheKey: string): string {
    return this.cacheKeyPrefix + cacheKey;
  }
}
