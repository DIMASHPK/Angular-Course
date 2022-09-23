import {Component, ComponentFactoryResolver, OnDestroy, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "../../../services/auth.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AlertComponent} from "../alert/alert.component";
import {PlaceholderDirective} from "../../directives/placeholder.directive";

@Component({
  selector: "app-auth",
  templateUrl: './auth.component.html'
})
export class AuthComponent{
  isLoginMode = true
  isLoading = false
  error: string | null = null

  subscription!: Subscription

  @ViewChild(PlaceholderDirective) alertHost!: PlaceholderDirective

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryresolver: ComponentFactoryResolver
  ) {
  }

  handleSwitchMode = () => {
    this.isLoginMode = !this.isLoginMode
  }

  handleSubmit = (authForm: NgForm) => {
    if(!authForm.valid){
      return
    }

    const {email, password} = authForm.value

    this.isLoading = true

    let authObservable: Observable<AuthResponseData>;

    if(this.isLoginMode){
      authObservable = this.authService
        .login(email, password)
    } else {
      authObservable = this.authService
        .signup(email, password)
    }

    const handleResolveSubscribe = (resData: AuthResponseData) => {
      this.isLoading = false
      this.error = null

      this.router.navigate(['/recipes'])

      console.log(resData)
    }

    const handleErrorSubscribe = (errorMessage: any) => {
      this.isLoading = false
      this.error = errorMessage

      this.showErrorAlert()

      console.log(errorMessage)
    }

    authObservable.subscribe({next: handleResolveSubscribe, error: handleErrorSubscribe})

    authForm.reset()
  }

  handleClose = () => {
    this.error = null
  }

  private showErrorAlert = () => {
    const alertComponent = this.componentFactoryresolver.resolveComponentFactory(AlertComponent)

    const hostViewContainerRef = this.alertHost.viewContainerRef

    hostViewContainerRef.clear()

    const componentRef = hostViewContainerRef.createComponent(alertComponent)

    componentRef.instance.message = this.error as string

    this.subscription = componentRef.instance.onClose.subscribe(() => {
      this.subscription.unsubscribe()
      this.handleClose()

      hostViewContainerRef.clear()
    })
  }
}
