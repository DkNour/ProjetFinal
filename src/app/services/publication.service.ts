import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from 'app/models/member';
import { Publication } from 'app/models/publication';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PublicationService {

  tab:Publication[]=[]  

  //private apiServer = 'http://localhost:9000/PUBLICATION-SERVICE';
  private apiServer = 'http://localhost:8099';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient : HttpClient) {}
  
  //getAllPublications() : Promise<Publication[]>{
   // return this.httpClient.get<Publication[]>(this.apiServer + '/publications').toPromise();
 // }
  getAllPublications(): Observable<Publication[]> {
    return this.httpClient.get<Publication[]>(this.apiServer + '/publications');
  }
  deletePublication(id): Observable<any> {
    return this.httpClient.delete<Publication>(this.apiServer + '/publication/' + id, this.httpOptions);
  }
  //deletePublication(id: number): Observable<any> {
    //return this.httpClient.delete('${this.apiServer}/publication/${id}', { responseType: 'text' });
  //}

  //deletePublication(id : any): Promise<void>{
    //return this.httpClient.delete<void>('linkToRestAPI').toPromise();
 // } 

 create(Publication): Observable<Publication> {
  return this.httpClient.post<Publication>(this.apiServer + '/publication/', JSON.stringify(Publication), this.httpOptions);
}

getPublicationById(id): Observable<Publication> {
  return this.httpClient.get<Publication>(this.apiServer + '/publication/' + id);
}

//getPublicationById(id : string): Promise<Publication>{
 // return this.httpClient.get<Publication>(this.apiServer + '/publication/' + id).toPromise();
//}





}