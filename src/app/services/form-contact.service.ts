import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormContactService 
{
  private urlApi = "https://127.0.0.1:8000/contact" //url de l'api et qui permet la connexion entre angular et symfony

  constructor(private http: HttpClient) { }

  sendContactForm(formData: any): Observable<any> 
  {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.urlApi, formData, {headers});
  }
}
