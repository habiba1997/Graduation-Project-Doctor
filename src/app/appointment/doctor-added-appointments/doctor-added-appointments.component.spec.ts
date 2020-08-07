import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { DoctorAddedAppointmentsComponent } from './doctor-added-appointments.component';


describe('DoctorAddedAppointmentsComponent', () => {
  let component: DoctorAddedAppointmentsComponent;
  let fixture: ComponentFixture<DoctorAddedAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorAddedAppointmentsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorAddedAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
