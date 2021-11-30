import 'dart:convert';

class UserDetail {
  int id;
  User user;
  UserDetail({
    required this.id,
    required this.user,
  });

  UserDetail copyWith({
    int? id,
    User? user,
  }) {
    return UserDetail(
      id: id ?? this.id,
      user: user ?? this.user,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'user': user.toMap(),
    };
  }

  factory UserDetail.fromMap(Map<String, dynamic> map) {
    return UserDetail(
      id: map['id'],
      user: User.fromMap(map['user']),
    );
  }

  String toJson() => json.encode(toMap());

  factory UserDetail.fromJson(String source) => UserDetail.fromMap(json.decode(source));

  @override
  String toString() => 'UserDetail(id: $id, user: $user)';

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
  
    return other is UserDetail &&
      other.id == id &&
      other.user == user;
  }

  @override
  int get hashCode => id.hashCode ^ user.hashCode;
}

class User {
  int id;
  String username;
  String email;
  User({
    required this.id,
    required this.username,
    required this.email,
  });

  User copyWith({
    int? id,
    String? username,
    String? email,
  }) {
    return User(
      id: id ?? this.id,
      username: username ?? this.username,
      email: email ?? this.email,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'username': username,
      'email': email,
    };
  }

  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      id: map['id'],
      username: map['username'],
      email: map['email'],
    );
  }

  String toJson() => json.encode(toMap());

  factory User.fromJson(String source) => User.fromMap(json.decode(source));

  @override
  String toString() => 'User(id: $id, username: $username, email: $email)';

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;

    return other is User &&
        other.id == id &&
        other.username == username &&
        other.email == email;
  }

  @override
  int get hashCode => id.hashCode ^ username.hashCode ^ email.hashCode;
}
