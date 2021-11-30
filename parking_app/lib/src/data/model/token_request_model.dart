import 'dart:convert';

class UserLogin {
  String username;
  String password;
  UserLogin({
    required this.username,
    required this.password,
  });

  UserLogin copyWith({
    String? username,
    String? password,
  }) {
    return UserLogin(
      username: username ?? this.username,
      password: password ?? this.password,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'username': username,
      'password': password,
    };
  }

  factory UserLogin.fromMap(Map<String, dynamic> map) {
    return UserLogin(
      username: map['username'],
      password: map['password'],
    );
  }

  String toJson() => json.encode(toMap());

  factory UserLogin.fromJson(String source) => UserLogin.fromMap(json.decode(source));

  @override
  String toString() => 'UserLogin(username: $username, password: $password)';

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
  
    return other is UserLogin &&
      other.username == username &&
      other.password == password;
  }

  @override
  int get hashCode => username.hashCode ^ password.hashCode;
}
