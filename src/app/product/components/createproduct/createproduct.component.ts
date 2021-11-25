// @ts-nocheck
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';
import { Observable, Subscriber } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css'],
})
export class CreateproductComponent implements OnInit {
  // @ViewChild('f') f:NgForm;
  constructor(private productService: ProductService, private router: Router) {}

  myimage!: Observable<any>;
  event!: Observable<any>;
  base64string!: string;
  isImageSaved: boolean;

  ngOnInit(): void {
    // setTimeout(() => this.f.form.patchValue({ PictureUrl: this.base64string }));
  }

  onSubmit(f: NgForm) {
    const CreateObserver = {
      next: (x: any) => console.log('Product Created'),
      error: (err: any) => console.log(err),
    };

    let Url = this.base64string;
    // this.f.form.patchValue({
    //   PictureUrl: Url,
    // });

    // this.f.form.patchValue({
    //   PictureUrl: Url,
    f.form.value.PictureUrl = Url;
    // });

    console.log(f);

    // formdata = new FormGroup({
    //   productName: new FormControl(f.value.productName),
    //   productDescription: new FormControl(f.value.productDescription),
    //   productPrice: new FormControl(f.value.productPrice),
    //   pictureUrl: new FormControl(this.base64string),
    // });

    this.productService.createproduct(f.value).subscribe(CreateObserver);
    // console.log(formData);
    alert('Product Created');
    this.router.navigateByUrl('/');
  }

  onChange($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    this.convertToBase64(file);
    console.log("clicked")
  }

  convertToBase64(file: File) {
    this.myimage = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    // console.log(this.myimage);
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
      // console.log(filereader.result);
      this.base64string = filereader.result as string;
      // console.log(this.base64string);
      this.isImageSaved = true;
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }

  removeImage(f: NgForm) {
    // console.log(PictureUrl.value)
    this.myimage = null;
    this.base64string = null;
    this.isImageSaved = false;
    document.getElementById('exampleInputPictureUrl').value = null;
  }
}
