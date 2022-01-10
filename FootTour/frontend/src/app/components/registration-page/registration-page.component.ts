import { Component, OnInit, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.sass']
})
export class RegistrationPageComponent implements OnInit {

  model = {
    email: '',
    password: '',
    passwordAgain: ''
  }

  token: string | undefined;
  screenHeight: any;
  screenWidth: any;

  termsAndConditionsDisplay = {
    small: false,
    default: true
  }

  constructor(private userService: UserService) {
    this.token = undefined;
    this.onResize();
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if (this.screenHeight < 600 || this.screenWidth < 530) {
      this.termsAndConditionsDisplay.default = false;
      this.termsAndConditionsDisplay.small = true;
    }
    else {
      this.termsAndConditionsDisplay.default = true;
      this.termsAndConditionsDisplay.small = false;
    }
  }

  public send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

    console.debug(`Token [${this.token}] generated`);
  }

  register(): void {
    if (this.model.password != this.model.passwordAgain) {
      
    }
      
    this.userService.insert(this.model).subscribe(
      result => this.userService.user = result,
      error => console.log(error)
    );
  }

}
