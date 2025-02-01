import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SearchResponse} from "./models/searchResponse";
import {Observable} from "rxjs";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private client: HttpClient) {}

  searchForAcademicWorks(searchValue: string, filters: Array<string>) {
    return this.client.get<Array<SearchResponse>>(
      `${environment.API_URL}search?searchText=${searchValue}${this._buildFilters(filters)}`
    );
  }

  downloadZIPAcademicWork(fileId: string) {
    return this.client.get(`${environment.API_URL}search/download/zip?fileId=${fileId}`, { responseType: 'blob' });
  }

  downloadPDFAcademicWork(fileId: string) {
    return this.client.get(`${environment.API_URL}search/download/pdf?fileId=${fileId}`, { responseType: 'blob' });
  }

  uploadNovoTrabalho(title: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);

    return this.client.post(`${environment.API_URL}process/upload`, formData)
  }

  getFiltersNames(): Observable<string[]> {
    return this.client.get<string[]>(`${environment.API_URL}search/filters`);
  }

  _buildFilters(filters: string[]): string {
    return filters.length > 0 ? `&filters=${filters.join('&filters=')}` : '';
  }
}
