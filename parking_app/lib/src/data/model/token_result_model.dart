import 'dart:convert';

class JWTToken {
  String refresh;
  String access;
  JWTToken({
    required this.refresh,
    required this.access,
  });

  JWTToken copyWith({
    String? refresh,
    String? access,
  }) {
    return JWTToken(
      refresh: refresh ?? this.refresh,
      access: access ?? this.access,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'refresh': refresh,
      'access': access,
    };
  }

  factory JWTToken.fromMap(Map<String, dynamic> map) {
    return JWTToken(
      refresh: map['refresh'],
      access: map['access'],
    );
  }

  String toJson() => json.encode(toMap());

  factory JWTToken.fromJson(String source) => JWTToken.fromMap(json.decode(source));

  @override
  String toString() => 'JWTToken(refresh: $refresh, access: $access)';

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
  
    return other is JWTToken &&
      other.refresh == refresh &&
      other.access == access;
  }

  @override
  int get hashCode => refresh.hashCode ^ access.hashCode;
}
