import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreateFormGroupArgs } from '@progress/kendo-angular-grid';
import { PostsService } from './services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'kendo-test';
  posts: any;
  public checked = true;
  public visible: any;

  constructor(private formBuilder: FormBuilder, private service: PostsService) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  public createFormGroup(args: CreateFormGroupArgs): FormGroup {
    const item = args.dataItem;

    this.formGroup = this.formBuilder.group({
      userId: item.userId,
      id: item.id,
      title: item.title,
      body: item.body,
    });

    return this.formGroup;
  }

  public formGroup: FormGroup = this.formBuilder.group({
    userId: null,
    id: null,
    title: '',
    body: '',
  });

  ngOnInit() {
    this.service.getPosts().subscribe((response) => {
      this.posts = response;
    });
  }

  public onChange(value: boolean): void {
    if (value === true) {
      this.visible = false;
    } else {
      this.visible = true;
    }
  }
}
