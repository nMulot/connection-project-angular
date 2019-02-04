import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
@Component({
  selector: 'app-header-block',
  templateUrl: './header-block.component.html',
  styleUrls: ['./header-block.component.scss']
})
export class HeaderBlockComponent implements OnInit {

  isConnected: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isConnected = this.authService.isConnected();
  }

}
