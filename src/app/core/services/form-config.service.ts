import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { FormConfig } from '../models/form-config';

@Injectable({
  providedIn: 'root'
})
export class FormConfigService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getFormConfig(formId: string): Observable<FormConfig> {
    // Beispiel: /assets/forms/feedback.json
    const url = `${this.apiUrl}/assets/forms/${formId}.json`;
    return this.http.get<FormConfig>(url).pipe(
      catchError(this.handleError<FormConfig>(`getFormConfig id=${formId}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
