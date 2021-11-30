import 'package:flutter/material.dart';
import 'package:parking_app/src/blocs/form_bloc.dart';

class FormProvider extends InheritedWidget {
  final bloc = FormBloc();
  FormProvider({ Key? key,required Widget child})
      : super(child: child, key: key);
  @override
  bool updateShouldNotify(covariant InheritedWidget oldWidget) {
    return true;
  }

  static FormBloc? of(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<FormProvider>()?.bloc;
  }
}
