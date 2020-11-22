// import {io} from 'socket.io-client';
import { Observable, from } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })
export class SocketIOService {


    constructor(private socket: Socket) {

    }

    // My stuff

    // BROADCASTER SERVER CALLS

    // 1: Emit broadcast after getting localstream
    public SendBroadcast(){
        this.socket.emit("broadcaster");
    }

    // 2: New Connection when peer joins 
    public ReceiveNewWatcher() {
      return Observable.create((observer) => {
        this.socket.on("watcher", id => {
          observer.next(id);        
        });
      });
    }

    // 3: Caller send connection offer to peer that just joined
    public SendConnectionOffer(id, localDescription){
        // this.socket.emit("offer", {id, localDescription});
        this.socket.emit("offer", id, localDescription);
    }

    // Caller receive answer from callee
    public ReceiveCalleeAnswer() {
        return Observable.create((observer) => {
            this.socket.on("answer", (id, description) => {
                observer.next({id,description});
            });
        });
    }

    // // Caller receive disconnect from peer
    // public ReceiveCalleeDisconnect(){
    //     return Observable.create((observer) => {
    //         this.socket.on("disconnectPeer", id => {
    //             observer.next(id);
    //           }); 
    //       });
    // }

    // Close socket if user closes window
    // NEED TO IMPLEMENT IN BROADCAST COMPONENT
    // public CloseSocket() {
    //     this.socket.close();
    // }

    // WATCHER SERVER CALLS

    // 1 Emit watcher after watcher connects
    public ListenToConnect() {
        return Observable.create((observer) => {
            this.socket.on("connect", () => {
                this.socket.emit("watcher");
                observer.next();
                });
        });
    }

    // 2 Wait for offer from broadcaster
    public ReceiveOfferFromBroadcaster () {
        return Observable.create((observer) => {
            this.socket.on("offer", (id, description) => {
                observer.next({id,description});
            });
        });
    }

    public SendWatcher() {
        this.socket.emit("watcher")
    }

    

    public SendAnswerToBroadcaster(id, localDescription) {
        this.socket.emit("answer", id, localDescription);
    }

    public ListenToBroadcast() {
        this.socket.on("broadcaster", () => {
            this.socket.emit("watcher");
        });
    }

    // public ListenToDisconnect() {
    //     return Observable.create((observer) => {
    //         this.socket.on("disconnectPeer", () => {
    //             observer.next(true);
    //         });
    //     })     
    // }


    // BOTH 

    // Receive Candidate from peers
    public ReceiveIceCandidate(){
        return Observable.create((observer) => {
            this.socket.on("candidate", (id, candidate) => {
                observer.next({id, candidate});
                }); 
            });
    }

    // Send Candidate to peer
    public SendIceCandidate(id, candidate) {
        this.socket.emit("candidate", id, candidate);
    }
}