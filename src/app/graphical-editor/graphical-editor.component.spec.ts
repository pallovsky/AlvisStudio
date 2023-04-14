import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicalEditorComponent } from './graphical-editor.component';

describe('GraphicalEditorComponent', () => {
  let component: GraphicalEditorComponent;
  let fixture: ComponentFixture<GraphicalEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphicalEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphicalEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
