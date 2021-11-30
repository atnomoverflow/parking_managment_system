import 'package:api_cache_manager/models/cache_db_model.dart';
import 'package:api_cache_manager/utils/cache_manager.dart';
import 'package:flutter/material.dart';
import 'package:parking_app/src/data/model/token_result_model.dart';

class ShairedServices {
  static Future<bool> hasToken() async {
    var isKeyExist = await APICacheManager().isAPICacheKeyExist("token");
    return isKeyExist;
  }

  static Future<JWTToken?> getToken() async {
    var isKeyExist = await APICacheManager().isAPICacheKeyExist("token");
    if (isKeyExist) {
      var cacheData = await APICacheManager().getCacheData("token");
      return JWTToken.fromJson(cacheData.syncData);
    }
  }

  static Future<void> setToken(JWTToken model) async {
    APICacheDBModel cacheDBModel =
        APICacheDBModel(key: "token", syncData: model.toJson());
    await APICacheManager().addCacheData(cacheDBModel);
  }

  static Future<void> removeToken(BuildContext context) async {
    await APICacheManager().deleteCache("token");
    Navigator.pushNamedAndRemoveUntil(context, "/login", (route) => false);
  }
}
