import io from 'socket.io-client'
import {fromEvent, Observable} from 'rxjs'

export class SocketService {
  private socket: SocketIOClient.Socket = {} as SocketIOClient.Socket; 

  public init(): SocketService {
    this.socket = io("http://localhost:8000");
    return this;
  }

  public send(event: string, body: {}): {} {
    return this.socket.emit(event, body);
  }

  public onConnect(): Observable<{}> {
    return fromEvent(this.socket, "message");
  }

  public disconnect(): void {
    this.socket.disconnect()
  }

};