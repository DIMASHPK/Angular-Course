import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../alert/alert.component';
import { PlaceholderDirective } from '../../directives/placeholder.directive';
import { Store } from '@ngrx/store';
import { StoreType } from '../../../types';
import {
  loginStart,
  resetError,
  signUpStart,
} from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;

  closeSubscription!: Subscription;
  authSubscription!: Subscription;

  @ViewChild(PlaceholderDirective) alertHost!: PlaceholderDirective;

  constructor(
    private componentFactoryresolver: ComponentFactoryResolver,
    private store: Store<StoreType>
  ) {}

  handleSwitchMode = () => {
    this.isLoginMode = !this.isLoginMode;
  };

  handleSubmit = (authForm: NgForm) => {
    if (!authForm.valid) {
      return;
    }

    const { email, password } = authForm.value;

    if (this.isLoginMode) {
      this.store.dispatch(loginStart({ payload: { email, password } }));
    } else {
      this.store.dispatch(signUpStart({ payload: { email, password } }));
    }

    authForm.reset();
  };

  handleClose = () => {
    this.store.dispatch(resetError());
  };

  private showErrorAlert = () => {
    const alertComponent =
      this.componentFactoryresolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;

    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertComponent);

    componentRef.instance.message = this.error as string;

    this.closeSubscription = componentRef.instance.onClose.subscribe(() => {
      this.closeSubscription.unsubscribe();
      this.handleClose();

      hostViewContainerRef.clear();
    });
  };

  ngOnInit() {
    const handleAuthSubscribe = ({ error, loading }: StoreType['auth']) => {
      this.isLoading = loading;

      if (error) {
        this.error = error;

        this.showErrorAlert();
      }
    };

    this.authSubscription = this.store
      .select('auth')
      .subscribe(handleAuthSubscribe);
  }

  ngOnDestroy() {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }

    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
