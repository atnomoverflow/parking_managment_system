from web3 import Web3
import json
from web3.logs import STRICT, IGNORE, DISCARD, WARN


def transfer_callback(log_entry):
    print("Event fired")


url = "https://ropsten.infura.io/v3/651599aa86d444b1b0808d31a98a916a"
private_key = (
    "287f0d46bb54e5d8f3b0bd47947d74e441f0be65713ca75b95f9660e026ac6a0"
)
public_key = "0x9F26005108Ae77D4C59f484Ebc07D45450F4cebE"
jsonFile = open(
    "path de fichier json de smart contract"
)
abi = json.load(jsonFile)
web3 = Web3(Web3.HTTPProvider(url))
address = web3.toChecksumAddress("0xDE51c072918dBaF3912EB12eA34d8758e01ace4d")
contract = web3.eth.contract(address=address, abi=abi["abi"])
# contract.on("GetCarLogsEvent", {}, transfer_callback)
nonce = web3.eth.getTransactionCount(public_key)
tx = contract.functions.checkOn("2").buildTransaction(
    {
        "chainId": 3,
        "gas": 3000000,
        "gasPrice": web3.toWei("40", "gwei"),
        "nonce": nonce,
    }
)
signed_tx = web3.eth.account.signTransaction(tx, private_key)
tx_hash = web3.eth.sendRawTransaction(signed_tx.rawTransaction)
tx_recipt = web3.eth.waitForTransactionReceipt(tx_hash)
print(tx_recipt)
nonce = web3.eth.getTransactionCount(public_key)
tx = contract.functions.checkOut("2").buildTransaction(
    {
        "chainId": 3,
        "gas": 3000000,
        "gasPrice": web3.toWei("40", "gwei"),
        "nonce": nonce,
    }
)
signed_tx = web3.eth.account.signTransaction(tx, private_key)
tx_hash = web3.eth.sendRawTransaction(signed_tx.rawTransaction)
tx_recipt = web3.eth.waitForTransactionReceipt(tx_hash)
print(tx_recipt)
tx = contract.functions.getCarLogsCount("2").call()
print(tx)
nonce = web3.eth.getTransactionCount(public_key)
tx = contract.functions.getCarLogs("2",1).call()
print(tx)
