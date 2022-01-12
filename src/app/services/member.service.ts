import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from 'app/models/member';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MemberService {

  tab:Member[]=[]  

  private apiServer = 'http://localhost:9000/MEMBRE-SERVICE';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient : HttpClient) {}
  
  getAllMembers(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(this.apiServer + '/membres');
  }
 

getMemberById(id): Observable<Member> {
  return this.httpClient.get<Member>(this.apiServer + '/membres/' + id);
}
//the problem is here
affecterauteurTopublication(idPublication, idMember): Observable<Member>{
  return this.httpClient.get<Member>(this.apiServer + '/affecterPub/' + idPublication + '/' + idMember);
}


getAuteurs(id): Observable<Member[]> {
  return this.httpClient.get<Member[]>(this.apiServer + '/auteurs/' + id);
}

}