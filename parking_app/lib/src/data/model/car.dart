import 'dart:convert';

class Car {
  int id;
  String plateNumber;
  int model;
  String mark;
  Car({
    required this.id,
    required this.plateNumber,
    required this.model,
    required this.mark,
  });


  Car copyWith({
    int? id,
    String? plateNumber,
    int? model,
    String? mark,
  }) {
    return Car(
      id: id ?? this.id,
      plateNumber: plateNumber ?? this.plateNumber,
      model: model ?? this.model,
      mark: mark ?? this.mark,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'plate_number': plateNumber,
      'model': model,
      'mark': mark,
    };
  }

  factory Car.fromMap(Map<String, dynamic> map) {
    return Car(
      id: map['id'],
      plateNumber: map['plate_number'],
      model: map['model'],
      mark: map['mark'],
    );
  }

  String toJson() => json.encode(toMap());

  factory Car.fromJson(String source) => Car.fromMap(json.decode(source));

  @override
  String toString() {
    return 'Car(id: $id, plate_number: $plateNumber, model: $model, mark: $mark)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
  
    return other is Car &&
      other.id == id &&
      other.plateNumber == plateNumber &&
      other.model == model &&
      other.mark == mark;
  }

  @override
  int get hashCode {
    return id.hashCode ^
      plateNumber.hashCode ^
      model.hashCode ^
      mark.hashCode;
  }
}
