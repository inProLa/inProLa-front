import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SearchResponse} from "./models/searchResponse";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class  SearchService {

  constructor(private client: HttpClient) {}

  searchForAcademicWorks(searchValue: string) {
    return this.client.get<Array<SearchResponse>>(`http://localhost:3000/search?searchText=${searchValue}`);
  }

  downloadZIPAcademicWork(fileId: string) {
    return this.client.get(`http://localhost:3000/search/download/zip?fileId=${fileId}`, { responseType: 'blob' });
  }

  downloadPDFAcademicWork(fileId: string) {
    return this.client.get(`http://localhost:3000/search/download/pdf?fileId=${fileId}`, { responseType: 'blob' });
  }

  uploadNovoTrabalho(title: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);

    return this.client.post(`http://localhost:3000/process/upload`, formData)
  }
}
