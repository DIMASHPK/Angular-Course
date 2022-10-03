import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { StoreType } from '../../types';
import { Store } from '@ngrx/store';
import { fetchRecipes, storeRecipes } from '../../store/recipes/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;

  private userSubscription!: Subscription;

  constructor(
    private store: Store<StoreType>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const handleUserSubscription = ({ user }: StoreType['auth']) => {
      this.isAuthenticated = !!user;
    };

    this.userSubscription = this.store
      .select('auth')
      .subscribe(handleUserSubscription);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  handleLogOut = () => {
    this.authService.logout();
  };

  handleSaveData = () => {
    this.store.dispatch(storeRecipes());
  };

  handleFetchData = () => {
    this.store.dispatch(fetchRecipes());
  };
}
