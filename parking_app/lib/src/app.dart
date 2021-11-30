import 'package:flutter/material.dart';
import 'package:parking_app/src/api/services/shaire_service.dart';
import 'package:parking_app/src/api/services/user_service.dart';
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
        home: FutureBuilder(
            future: ShairedServices.getToken(),
            builder: (_, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return CircularProgressIndicator();
              } else {
                return Login();
              }
            }),
        routes: {
          '/home':(_)=>Home(),
          '/login':(_)=>Login(),
          '/signup':(_)=>Signup(),
          '/forgot_password':(_)=>ForgotPassword(),

        },
      ),
    );
  }
}
