import { Component, OnInit } from '@angular/core';
import { Article } from 'app/models/article';
import { ArticleService } from 'app/services/articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'titre', 'dateapparition', 'type'];

  dataSource:Article[]

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
  }

  getAllData(): void{
  this.articleService.getAllArticles().then((data) => this.dataSource = data)
  }

}
