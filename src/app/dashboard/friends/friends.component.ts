import { Component, OnInit } from '@angular/core';
import {BackendService} from '../../backend.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  searchMode = false;
  friendName = '';
  displayHelpText = false;
  searchResult = [];
  friendList = null;
  friendListLoaded = false;
  constructor(private backendService: BackendService) {
  }

  ngOnInit() {
    this.backendService.getFriends()
      .then((resData) => {
      this.friendList = resData;
      this.friendListLoaded = true;
      console.log(resData);
      })
      .catch((error) => {
      console.log(error);
      });
  }

  onSearch() {
    this.searchMode = true;
    this.displayHelpText = true;
    if (this.friendName.length > 2) {
      this.displayHelpText = false;
      const fullName = this.friendName.split(' ');
      const queryData = fullName.length === 1 ? {'first_name': fullName[0]} : {'first_name': fullName[0], 'last_name': fullName[1]};
        this.backendService.onSearchPeoples(queryData).subscribe((resData: Response) => {
          this.searchResult = resData.json();
        }, (error: Response) => {
          alert(error);
        });
    }
  }

  onBlur() {
    if (this.friendName === '') {
      this.searchMode = false;
    }
  }

  onAddFriend(id: number) {
    this.backendService.addFriend(id)
      .then((resData) => {
      console.log(resData);
      })
      .catch((error) => {
      console.log(error);
      });
  }
}

