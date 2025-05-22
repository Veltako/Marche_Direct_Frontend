import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'https://localhost:8000/api/comments/user';

  constructor(private http: HttpClient) {}

  // Récupérer les commentaires d'un user par son id
  getCommentsByUserId(userId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/${userId}`);
  }
}
