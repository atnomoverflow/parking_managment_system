from brownie import ParkingLogs, accounts


def deploy():
    ParkingLogs.deploy({"from": accounts[0]})


def main():
    deploy()
