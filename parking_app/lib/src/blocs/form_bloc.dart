import 'package:flutter/material.dart';
import 'package:parking_app/src/api/services/user_service.dart';
import 'package:parking_app/src/blocs/validation_mixins.dart';
import 'package:parking_app/src/data/model/token_request_model.dart';
import 'package:rxdart/rxdart.dart';
import 'package:rxdart/subjects.dart';

class FormBloc with ValidatorMixins {
  final _email = new BehaviorSubject<String>();
  final _password = new BehaviorSubject<String>();
  final _errorMessage = new BehaviorSubject<String>();

  Function(String) get changeEmail => _email.sink.add;
  Function(String) get changePassword => _password.sink.add;
  Function(String) get addError => _errorMessage.sink.add;

  Stream<String> get email => _email.stream.transform(validatorEmail);
  Stream<String> get password => _password.stream.transform(validatorPassword);
  Stream<String> get errorMessage => _password.stream;

  Stream<bool> get submitValidForm =>
      Rx.combineLatest3(email, password, errorMessage, (a, b, er) => true);
  late IUserService authService;

  dynamic login(BuildContext context) async {
    authService = new UserService();
    try {
      var result = await authService.login(
          new UserLogin(username: _email.value, password: _password.value));

      Navigator.pushNamed(context, "/forgot_password");
    } catch (e) {
      addError(e.toString());
    }
  }

  dynamic signup(BuildContext context) async {
    authService = new UserService();
    try {
      var result = await authService.signup(
          new UserLogin(username: _email.value, password: _password.value));
    } catch (e) {
      addError(e.toString());
    }
  }

  dispose() {
    _email.close();
    _password.close();
    _errorMessage.close();
  }
}
