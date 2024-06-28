export class Constants {
  //For Student Types
  static PRESENT = 'PRESENT';
  static TERMINATED = 'TERMINATED';
  static DELETED = 'DELETED';
  static ALL = 'ALL';

  //For Enrollments
  static REGISTERED = 'REGISTERED';
  static COMPLETED = 'COMPLETED';
  static LEFT = 'LEFT';

  static defaultPageSize = 20;

  //For Sorting
  static ASC = 'ASC';
  static DESC = 'DESC';
  static DEFAULT_SORT_COLUMN = 'name';
  static SortableStudentColumns = ['id', 'name', 'cnic'];

  static get BAD_SORT_DATA() {
    return JSON.stringify({
      status: '400-011',
      message: 'bad sort type or column',
    });
  }

  static get BAD_STUDENT_TYPE() {
    return JSON.stringify({
      status: '400-010',
      message: 'students type is missed or incorrect',
    });
  }

  static get CNIC_ALREADY_EXISTS() {
    return JSON.stringify({
      status: '400-001',
      message: "student's cnic already exists",
    });
  }

  static get TERMINATION_FAILED() {
    return JSON.stringify({
      status: '400-002',
      message: '',
    });
  }
}
