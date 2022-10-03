import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable} from 'rxjs';
import { Store } from '@ngrx/store';
import { StoreType } from '../../../types';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  recipes!: Observable<StoreType["recipes"]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<StoreType>
  ) {
    this.recipes = this.store.select("recipes")
  }

  handleNewClick = () => {
    this.router.navigate(['new'], { relativeTo: this.route });
  };
}
