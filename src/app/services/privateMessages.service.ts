import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
  })
  export class PrivateMessageService {
    domain : string = environment.domain ;
    messages ;

    constructor(
        private http: HttpClient,
        private authSRV: AuthService
        ){}

    addPrivateMessage(idUserSender: number, messageContent: string) {
        this.http.post(`${this.domain}private-message/add`, {
          senderId: idUserSender,
          receiverId: this.authSRV.currentUser.id, 
          messageContent: messageContent
        }).subscribe()
      }

      getMessages(userId: number){
          this.http.get(`${this.domain}private-message/getMessages/${userId}`).subscribe(messages => {
              this.messages = messages ;
          })

      }
  }