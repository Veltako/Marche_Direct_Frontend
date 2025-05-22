import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Comment } from '../../../models/comment.model';
import { CommentService } from '../../../services/comment.service';

@Component({
  selector: 'app-user-comment',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-comment.component.html',
  styleUrl: './user-comment.component.css'
})
export class UserCommentComponent implements OnInit {
  comments: Comment[] = [];
  userId!: number; // id user 

  constructor(private commentService: CommentService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Récupère l'ID utilisateur depuis l'URL
    this.userId = +this.route.snapshot.paramMap.get('id')!;

    if (this.userId) {
      // Si id valide, récupère les commentaires
      this.commentService.getCommentsByUserId(this.userId).subscribe(
        (data: Comment[]) => {
          this.comments = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des commentaires', error);
        }
      );
    } else {
      console.error('ID utilisateur manquant dans l\'URL');
    }
  }
}
