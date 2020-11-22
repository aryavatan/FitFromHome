import { Component, OnInit } from '@angular/core';
import { SocketIOService } from '../services/socket-ioservice.service';

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.scss']
})
export class BroadcastComponent implements OnInit {
  public title = 'broadcast';
  public localStream: any;

  public peerConnections = {};
  public peerConnection: any;

  public video = document.querySelector("video") as HTMLVideoElement;

  public config = {
    iceServers: [
      {
        urls: ["stun:stun.l.google.com:19302"]
      }
    ]
  };

  constructor(
    private socketIOService: SocketIOService
  ) { }

  ngOnInit() {
    this.GetLocalStream();
    this.ListenNewWatcher();
    this.ListenForIceCandidate();
    this.ListenForCalleeAnswer();
  }

  // Get Camera from browswer
  GetLocalStream() {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true })
  .then( stream => {
    this.localStream = stream;
    this.GotLocalStream(this.localStream)
    this.socketIOService.SendBroadcast();
  }).catch(error => console.error(error));
  }

  // Put video on browser
  GotLocalStream(stream) {
    var lv = document.getElementById('local-video') as HTMLVideoElement;
    lv.srcObject = stream;
    lv.controls = false;
    lv.muted = true;
    lv.volume = 0;
    this.localStream = stream;
}

ListenNewWatcher() {
  this.socketIOService.ReceiveNewWatcher()
  .subscribe((id) => {
    const peerConnection = new RTCPeerConnection(this.config);
    this.peerConnections[id] = peerConnection;

    this.localStream.getTracks().forEach(track => peerConnection.addTrack(track, this.localStream));
  
    // Create candidate for WebRTC
    peerConnection.onicecandidate = event => {
      if (event.candidate) {
        this.socketIOService.SendIceCandidate(id, event.candidate)
      }
    };

    peerConnection.createOffer()
    .then(sdp => peerConnection.setLocalDescription(sdp))
    .then(() => {
      this.socketIOService.SendConnectionOffer(id, peerConnection.localDescription);
      });
  });
}


ListenForCalleeAnswer(){
  this.socketIOService.ReceiveCalleeAnswer()
  .subscribe((data)=> {
    let id = data.id;
    let description = data.description
    this.peerConnections[id].setRemoteDescription(description);
    })
  }


ListenForIceCandidate(){
  this.socketIOService.ReceiveIceCandidate()
  .subscribe((data)=> {
    let id = data.id;
    let candidate = data.candidate
    this.peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
    })
  }

  

  

  // ListenForCalleeDisconnect(){
  // this.socketIOService.ReceiveCalleeDisconnect()
  // .subscribe((id)=> {
  //   this.peerConnections[id].close();
  //   delete this.peerConnections[id];
  //   })
  // }

//   // Add function that closes socket if broadcaster closes window?


  
}

