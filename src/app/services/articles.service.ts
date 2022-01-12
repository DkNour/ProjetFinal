import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from 'app/models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiServer = 'http://localhost:8083';

  constructor(private httpClient : HttpClient) {}
  
  getAllArticles() : Promise<Article[]>{
    return this.httpClient.get<Article[]>(this.apiServer + '/publications').toPromise();
  }

}