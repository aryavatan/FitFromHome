import { Component, OnInit } from '@angular/core';
import { SocketIOService } from '../services/socket-ioservice.service';

@Component({
  selector: 'app-watcher',
  templateUrl: './watcher.component.html',
  styleUrls: ['./watcher.component.scss']
})
export class WatcherComponent implements OnInit {

  public peerConnection: any;
  public video = document.querySelector('video') as HTMLVideoElement;
  public localStream: any;
  constructor(private socketIOService: SocketIOService) { }

  public config = {
    iceServers: [
      {
        urls: ["stun:stun.l.google.com:19302"]
      }
    ]
  };

  ngOnInit() {
    // Listen for connect
    this.ListenToConnectForWatcher()
    this.ListenForBroadcastOffer()
    this.ListenForIceCandidate()

    // this.socketIOService.SendWatcher();
    // this.socketIOService.ListenToConnect();

  }

  ListenToConnectForWatcher() {
    this.socketIOService.ListenToConnect()
      .subscribe(() => {
        console.log("Received connect")
      })
  }

  ListenForBroadcastOffer(){
    this.socketIOService.ReceiveOfferFromBroadcaster()
      .subscribe((data) => {
        let id = data.id
        let description = data.description
        this.peerConnection = new RTCPeerConnection(this.config);
        this.peerConnection
          .setRemoteDescription(description)
          .then(sdp => this.peerConnection.setLocalDescription(sdp)).catch(error => console.log(error))
          .then(() => this.peerConnection.createAnswer()).catch(error => console.log(error))
          .then(() => {
            this.socketIOService.SendAnswerToBroadcaster(id, this.peerConnection.localDescription);    
          }).catch(error => console.log(error));
        // this.peerConnection
        //   .setRemoteDescription(description)
        //   .then(function() {
        //     this.peerConnection
        //     .createAnswer().then(function(answer) {
        //     return this.peerconnection.setLocalDescription(answer);
        //   })
        //   .then(function() {
        //     this.socketIOService.SendAnswerToBroadcaster(id, this.peerConnection.localDescription);    
        //   })
        //   .catch(error => console.log(error));
        // })
          
        
          
          // Continue getting video stream
          this.peerConnection.ontrack = event => {
            var vid = document.getElementById('local-video') as HTMLVideoElement
            vid.srcObject = event.streams[0];

          };
      
          this.peerConnection.onicecandidate = event => {
            if (event.candidate) {
              this.socketIOService.SendIceCandidate(id, event.candidate );
            }
          };
      })
  }

  ListenForIceCandidate(){
      this.socketIOService.ReceiveIceCandidate()
      .subscribe((data)=> {
        let id = data.id;
        let candidate = data.candidate
        this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
        .catch(e => console.error(e));
        });
  }

  // handles graceful disconnect, bugging out
  
  // ListenForDisconnect(){
  //   this.socketIOService.ListenToDisconnect
  //   .subscribe( (flag) => {
  //     this.peerConnection.close();
  // //   })
  // }




}
