import 'package:flutter/material.dart';
import 'package:parking_app/src/blocs/form_provider.dart';
import 'package:parking_app/src/ui/forgot_password_ui.dart';
import 'package:parking_app/src/ui/home_ui.dart';
import 'package:parking_app/src/ui/login_ui.dart';
import 'package:parking_app/src/ui/sign_up_ui.dart';

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return FormProvider(
      child: MaterialApp(
        title: 'Parking_app',
        darkTheme: ThemeData.dark(),
        themeMode: ThemeMode.dark,
        initialRoute: '/',
        onGenerateRoute: onGenerateRoute,
      ),
    );
  }

  Route onGenerateRoute(RouteSettings routeSettings) {
    if (routeSettings.name == "/login") {
      return MaterialPageRoute(builder: (_) => Login());
    }
    if (routeSettings.name == "/forgot_password") {
      return MaterialPageRoute(builder: (_) => ForgotPassword());
    }
    if (routeSettings.name == "/sign_up") {
      return MaterialPageRoute(builder: (_) => Signup());
    }
    return MaterialPageRoute(builder: (_) => Home());
  }
}
