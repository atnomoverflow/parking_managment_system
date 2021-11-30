// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;
import "./2_Owner.sol";

contract ParkingLogs is Owner {
    enum Action {
        CheckIn,
        CheckOut
    }
    struct LogOfCars {
        string uid;
        uint256 time;
        Action actionType;
    }
    event GetCarLogsEvent(LogOfCars[] _log);

    event CheckInEvent(string uid, uint256 time, string typeOfEvent);
    event CheckOutEvent(string uid, uint256 time, string typeOfEvent);
    mapping(string => LogOfCars[]) logOfAllCars;

    function checkOn(string memory _uid) public isOwner {
        LogOfCars memory log;
        log.uid = _uid;
        log.time = block.timestamp;
        log.actionType = Action.CheckIn;
        logOfAllCars[_uid].push(log);
        string memory eventType = "CheckIn";
        emit CheckInEvent(_uid, log.time, eventType);
    }

    function checkOut(string memory _uid) public isOwner {
        LogOfCars memory log;
        log.uid = _uid;
        log.time = block.timestamp;
        log.actionType = Action.CheckOut;
        logOfAllCars[_uid].push(log);
        string memory eventType = "CheckOut";
        emit CheckOutEvent(_uid, log.time, eventType);
    }

    function getCarLogs(string memory _uid) public isOwner {
        emit GetCarLogsEvent(logOfAllCars[_uid]);
    }
}
