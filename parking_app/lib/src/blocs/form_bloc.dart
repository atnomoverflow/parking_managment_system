import 'package:parking_app/src/blocs/validation_mixins.dart';
import 'package:rxdart/rxdart.dart';
import 'package:rxdart/subjects.dart';

class FormBloc with ValidatorMixins {
  final _email = new BehaviorSubject<String>();
  final _password = new BehaviorSubject<String>();
  final _errorMessage = new BehaviorSubject<String>();

  Function(String) get changeEmail => _email.sink.add;
  Function(String) get changePassword => _password.sink.add;
  Function(String) get changeErrorMessage => _errorMessage.sink.add;

  Stream<String> get email => _email.stream.transform(validatorEmail);
  Stream<String> get password => _password.stream.transform(validatorPassword);
  Stream<String> get errorMessage => _password.stream;

  Stream<bool> get submitValidForm =>
      Rx.combineLatest3(email, password, errorMessage, (a, b, er) => true);
  submit() {
    print(_email.value);
    print(_password.value);
  }

  dispose() {
    _email.close();
    _password.close();
  }
}
