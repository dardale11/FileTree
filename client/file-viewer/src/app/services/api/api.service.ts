import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import FileSystemNode from 'src/app/interfaces/file-system-node';

const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  search(searchTerm?: string) {
    const url =
      SERVER_URL +
      (searchTerm && searchTerm.length > 0
        ? `/files?q=${searchTerm}`
        : '/files');

    return this.http.get<any>(url);
  }
}
