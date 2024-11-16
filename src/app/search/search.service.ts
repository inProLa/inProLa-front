import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SearchResponse} from "./models/searchResponse";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  client = inject(HttpClient)

  searchForAcademicWorks(searchValue: string) {
    return this.client.get<Array<SearchResponse>>(`http://localhost:3000/search?searchText=${searchValue}`);
  }

  downloadAcademicWork(fileId: string) {
    return this.client.get(`http://localhost:3000/search/download?fileId=${fileId}`, { responseType: 'blob' });
  }
}
