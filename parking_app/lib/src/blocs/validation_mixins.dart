import 'dart:async';

class ValidatorMixins {
  final validatorEmail =
      StreamTransformer<String, String>.fromHandlers(handleData: (email, sink) {
    if (!email.contains("@") || email.contains(" ")) {
      sink.addError("Please enter a valid email");
    } else {
      sink.add(email);
    }
  });
   final validatorPassword =
      StreamTransformer<String, String>.fromHandlers(handleData: (password, sink) {
    if (password.length>8) {
      sink.add(password);
    } else {
      sink.addError("Need to be more than 8 charachter");
    }
  });
}
