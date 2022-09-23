import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../../shared/services/data-storage.service";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated = false

  private userSubscription!: Subscription


  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const handleUserSubscription = (userData: User | null) => {
      this.isAuthenticated = !!userData
    }

    this.userSubscription = this.authService.subscribeUserSubject(handleUserSubscription)
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe()
  }

  handleLogOut = () => {
    this.authService.logout()
  }


  handleSaveData = () => {
   this.dataStorageService.storeRecipe()
  }

  handleFetchData = () => {
    this.dataStorageService.fetchRecipes().subscribe()
  }
}
