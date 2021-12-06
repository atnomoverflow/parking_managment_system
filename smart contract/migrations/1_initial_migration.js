const Migrations = artifacts.require("ParkingLogs");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
