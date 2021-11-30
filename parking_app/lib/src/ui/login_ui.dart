import 'package:flutter/material.dart';
import 'package:parking_app/src/blocs/form_bloc.dart';
import 'package:parking_app/src/blocs/form_provider.dart';

class Login extends StatelessWidget {
  const Login({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final FormBloc? formBloc = FormProvider.of(context);
    return Scaffold(
      body: Center(
        child: Container(
          margin: const EdgeInsets.only(left: 50.0, top: 230.0, right: 50.0),
          height: 550.0,
          child: Form(
            child: Column(
              children: <Widget>[
                _emailField(formBloc),
                _passwordField(formBloc),
                Row(
                  children: [
                    _checkBox(),
                    GestureDetector(
                      child: const Text('register'),
                      onTap: () => Navigator.pushNamed(context, "/signup"),
                    ),
                  ],
                ),
                _button(formBloc),
                _forgotPasswordButton(context)
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _emailField(FormBloc? formBloc) {
    return StreamBuilder<String>(
        stream: formBloc?.email,
        builder: (context, snapshot) {
          return TextField(
            keyboardType: TextInputType.emailAddress,
            decoration: const InputDecoration(
              hintText: "example@xyz.com",
              labelText: 'Email',
            ),
            onChanged: formBloc?.changeEmail,
          );
        });
  }

  Widget _passwordField(FormBloc? formBloc) {
    return StreamBuilder<String>(
        stream: formBloc?.password,
        builder: (context, snapshot) {
          return TextField(
            obscureText: true,
            decoration: InputDecoration(
              hintText: "Password",
              labelText: 'Password',
              errorText: snapshot.hasError ? '${snapshot.error}' : null,
            ),
            onChanged: formBloc?.changePassword,
          );
        });
  }

  Widget _checkBox() {
    return Row(
      children: <Widget>[
        Checkbox(value: false, onChanged: (checked) => {}),
        const Text("Keep me logged in")
      ],
    );
  }

  Widget _button(FormBloc? formBloc) {
    return StreamBuilder<Object>(
        stream: formBloc?.submitValidForm,
        builder: (context, snapshot) {
          return Padding(
              padding: const EdgeInsets.all(20.0),
              child: ElevatedButton(
                  onPressed: () {
                    if (snapshot.hasError) {
                      return null;
                    }
                    return formBloc!.login(context);
                  },
                  clipBehavior: Clip.hardEdge,
                  child: const Icon(Icons.arrow_forward),
                  style: ElevatedButton.styleFrom(
                    primary: Colors.amber,
                    onPrimary: Colors.white,
                    elevation: 10,
                    onSurface: Colors.blueGrey,
                    textStyle: const TextStyle(color: Colors.white),
                  )));
        });
  }

  Widget _forgotPasswordButton(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        GestureDetector(
          onTap: () => Navigator.pushNamed(context, '/forgot_password'),
          child: Container(
            child: const Text('Forgot Password'),
            alignment: Alignment.bottomLeft,
          ),
        ),
        GestureDetector(
          onTap: () => Navigator.pushNamed(context, '/sign_up'),
          child: Container(
            child: const Text('Sign up'),
            alignment: Alignment.bottomLeft,
          ),
        ),
      ],
    );
  }
}
