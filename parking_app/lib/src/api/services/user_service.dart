import 'dart:convert';
import 'package:parking_app/src/api/services/shaire_service.dart';
import 'package:parking_app/src/data/model/token_result_model.dart';
import 'package:parking_app/src/data/model/token_request_model.dart';
import 'package:parking_app/src/data/model/user_detail_responce_model.dart';

import 'package:parking_app/src/api/api_config.dart';
import 'package:http/http.dart' as http;

abstract class IUserService {
  Future<JWTToken> login(UserLogin userLogin);
  Future<JWTToken> signup(UserLogin userLogin);
  Future<UserDetail> getUser();
}

class UserService extends IUserService {
  static var client = http.Client();
  @override
  Future<JWTToken> login(UserLogin userLogin) async {
        var response = await client.post(
      Uri.parse(AppConfig.login),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: userLogin.toJson(),
    );

    if (response.statusCode == 200) {
      await ShairedServices.setToken(JWTToken.fromJson(response.body));
      return JWTToken.fromJson(response.body);
    } else {
      throw Exception(jsonDecode(response.body));
    }
  }

  @override
  Future<UserDetail> getUser() async {
    var token = await ShairedServices.getToken();
    String? accesToken = token?.access;
    final responce = await http.get(
      Uri.parse(AppConfig.userDetail),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': "brear $accesToken"
      },
    );
    if (responce.statusCode == 200) {
      return UserDetail.fromJson(responce.body);
    } else {
      throw Exception(jsonDecode(responce.body));
    }
  }

  @override
  Future<JWTToken> signup(UserLogin userLogin) {
    throw UnimplementedError();
  }
}
