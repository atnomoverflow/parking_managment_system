import 'dart:async';

class ValidatorMixins {
  final validatorEmail =
      StreamTransformer<String, String>.fromHandlers(handleData: (email, sink) {
    
      sink.add(email);
   
  });
   final validatorPassword =
      StreamTransformer<String, String>.fromHandlers(handleData: (password, sink) {
   
      sink.add(password);
    
  });
}
