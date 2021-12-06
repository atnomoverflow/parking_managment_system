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
    mapping(string => LogOfCars[]) logOfAllCars;

    function checkOn(string memory _uid) public isOwner {
        LogOfCars memory log;
        log.uid = _uid;
        log.time = block.timestamp;
        log.actionType = Action.CheckIn;
        logOfAllCars[_uid].push(log);
    }

    function checkOut(string memory _uid) public isOwner {
        LogOfCars memory log;
        log.uid = _uid;
        log.time = block.timestamp;
        log.actionType = Action.CheckOut;
        logOfAllCars[_uid].push(log);
    }

    function getCarLogsCount(string memory _uid)
        public
        view
        returns (uint256)
    {
        return logOfAllCars[_uid].length;
    }

    function getCarLogs(string memory _uid, uint256 ligne)
        public
        view
        returns (
            string memory,
            uint256,
            string memory
        )
    {
        string memory uid = _uid;
        uint256 time = logOfAllCars[_uid][ligne].time;
        string memory action = "";
        if (logOfAllCars[_uid][ligne].actionType == Action.CheckIn) {
            action = "CheckIn";
        } else {
            action = "CheckOut";
        }
        return (uid, time, action);
    }
}
