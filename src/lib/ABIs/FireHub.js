export const FireHub = {
    "_format": "hh-sol-artifact-1",
    "contractName": "FireHub",
    "sourceName": "contracts/5ireHub.sol",
    "abi": [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_FireSwap",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_FireRouter",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "FireRouter",
            "outputs": [
                {
                    "internalType": "contract IFireRouter",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "FireSwap",
            "outputs": [
                {
                    "internalType": "contract IFireSwap",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "sellToken",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "sellAmt",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "buyToken",
                            "type": "address"
                        },
                        {
                            "internalType": "bytes",
                            "name": "swapData",
                            "type": "bytes"
                        }
                    ],
                    "internalType": "struct IFireSwap.FireSwapInfo",
                    "name": "_srcSwapDetails",
                    "type": "tuple"
                },
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "asset",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "rmtChainId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "gasLimit",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "gasFee",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "receiver",
                            "type": "address"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "address",
                                    "name": "sellToken",
                                    "type": "address"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "sellAmt",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "address",
                                    "name": "buyToken",
                                    "type": "address"
                                },
                                {
                                    "internalType": "bytes",
                                    "name": "swapData",
                                    "type": "bytes"
                                }
                            ],
                            "internalType": "struct IFireSwap.FireSwapInfo",
                            "name": "swapDetails",
                            "type": "tuple"
                        }
                    ],
                    "internalType": "struct FireHub.BridgeInfo",
                    "name": "_bridgeInfo",
                    "type": "tuple"
                }
            ],
            "name": "bridge",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "asset",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "rmtChainId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "gasLimit",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "gasFee",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "receiver",
                            "type": "address"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "address",
                                    "name": "sellToken",
                                    "type": "address"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "sellAmt",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "address",
                                    "name": "buyToken",
                                    "type": "address"
                                },
                                {
                                    "internalType": "bytes",
                                    "name": "swapData",
                                    "type": "bytes"
                                }
                            ],
                            "internalType": "struct IFireSwap.FireSwapInfo",
                            "name": "swapDetails",
                            "type": "tuple"
                        }
                    ],
                    "internalType": "struct FireHub.BridgeInfo",
                    "name": "_bridgeInfo",
                    "type": "tuple"
                }
            ],
            "name": "bridgeETH",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_router",
                    "type": "address"
                }
            ],
            "name": "configureFireRouter",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_swap",
                    "type": "address"
                }
            ],
            "name": "configureFireSwap",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_rmtChainId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_rmtFireRouter",
                    "type": "address"
                }
            ],
            "name": "configureRmtRouter",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_rmtChainId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_rmtToken",
                    "type": "address"
                },
                {
                    "internalType": "uint8",
                    "name": "_decimal",
                    "type": "uint8"
                },
                {
                    "internalType": "bool",
                    "name": "isWETH",
                    "type": "bool"
                }
            ],
            "name": "configureRmtToken",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "isActive",
                    "type": "bool"
                }
            ],
            "name": "configureSupportToken",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_receiver",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_asset",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                },
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "sellToken",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "sellAmt",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "buyToken",
                            "type": "address"
                        },
                        {
                            "internalType": "bytes",
                            "name": "swapData",
                            "type": "bytes"
                        }
                    ],
                    "internalType": "struct IFireSwap.FireSwapInfo",
                    "name": "_swapDetails",
                    "type": "tuple"
                }
            ],
            "name": "handleBridge",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_receiver",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_asset",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                },
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "sellToken",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "sellAmt",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "buyToken",
                            "type": "address"
                        },
                        {
                            "internalType": "bytes",
                            "name": "swapData",
                            "type": "bytes"
                        }
                    ],
                    "internalType": "struct IFireSwap.FireSwapInfo",
                    "name": "_swapDetails",
                    "type": "tuple"
                }
            ],
            "name": "handleBridgeETH",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "rmtChain",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "rmtFireRouter",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "rmtToken",
                    "type": "address"
                },
                {
                    "internalType": "uint8",
                    "name": "decimals",
                    "type": "uint8"
                },
                {
                    "internalType": "bool",
                    "name": "isWETH",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "supportToken",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_receiver",
                    "type": "address"
                },
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "sellToken",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "sellAmt",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "buyToken",
                            "type": "address"
                        },
                        {
                            "internalType": "bytes",
                            "name": "swapData",
                            "type": "bytes"
                        }
                    ],
                    "internalType": "struct IFireSwap.FireSwapInfo",
                    "name": "_swapDetails",
                    "type": "tuple"
                }
            ],
            "name": "swap",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_token",
                    "type": "address"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "withdrawETH",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        }
    ],
    "bytecode": "0x60806040523480156200001157600080fd5b5060405162003f5838038062003f588339818101604052810190620000379190620002eb565b620000576200004b620001b560201b60201c565b620001bd60201b60201c565b60018081905550600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614158015620000c95750600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614155b6200010b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620001029062000393565b60405180910390fd5b81600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550620001ad620001a1620001b560201b60201c565b620001bd60201b60201c565b5050620003b5565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620002b38262000286565b9050919050565b620002c581620002a6565b8114620002d157600080fd5b50565b600081519050620002e581620002ba565b92915050565b6000806040838503121562000305576200030462000281565b5b60006200031585828601620002d4565b92505060206200032885828601620002d4565b9150509250929050565b600082825260208201905092915050565b7f356972654875623a5a65726f416464726573734e6f74416c6c6f776564000000600082015250565b60006200037b601d8362000332565b9150620003888262000343565b602082019050919050565b60006020820190508181036000830152620003ae816200036c565b9050919050565b613b9380620003c56000396000f3fe6080604052600436106101185760003560e01c80638da5cb5b116100a0578063cf5ef12811610064578063cf5ef1281461036e578063d06418c91461038a578063d4a34464146103ba578063e086e5ec146103e3578063f2fde38b146103fa5761011f565b80638da5cb5b1461029d578063a757dcfb146102c8578063ad3d298f146102f3578063b959e5621461031c578063c59f1e33146103455761011f565b80632a4f1621116100e75780632a4f1621146101c45780632d7fb17a1461020157806351cff8d914610241578063674611c91461026a578063715018a6146102865761011f565b80630a4417de146101245780630bd71f3a1461014d5780630e71b30c146101785780630f9f674a146101945761011f565b3661011f57005b600080fd5b34801561013057600080fd5b5061014b60048036038101906101469190612804565b610423565b005b34801561015957600080fd5b506101626104de565b60405161016f9190612890565b60405180910390f35b610192600480360381019061018d9190612b81565b610504565b005b6101ae60048036038101906101a99190612bf9565b6108a5565b6040516101bb9190612c97565b60405180910390f35b3480156101d057600080fd5b506101eb60048036038101906101e69190612804565b610b58565b6040516101f89190612c97565b60405180910390f35b34801561020d57600080fd5b5061022860048036038101906102239190612cb2565b610b78565b6040516102389493929190612d0a565b60405180910390f35b34801561024d57600080fd5b5061026860048036038101906102639190612804565b610c02565b005b610284600480360381019061027f9190612d4f565b610d20565b005b34801561029257600080fd5b5061029b61112c565b005b3480156102a957600080fd5b506102b2611140565b6040516102bf9190612d98565b60405180910390f35b3480156102d457600080fd5b506102dd611169565b6040516102ea9190612dd4565b60405180910390f35b3480156102ff57600080fd5b5061031a60048036038101906103159190612804565b61118f565b005b34801561032857600080fd5b50610343600480360381019061033e9190612e1b565b61124a565b005b34801561035157600080fd5b5061036c60048036038101906103679190612e87565b61131c565b005b61038860048036038101906103839190612eee565b6115e0565b005b6103a4600480360381019061039f9190612bf9565b61175b565b6040516103b19190612c97565b60405180910390f35b3480156103c657600080fd5b506103e160048036038101906103dc9190612f4a565b611a3a565b005b3480156103ef57600080fd5b506103f8611cda565b005b34801561040657600080fd5b50610421600480360381019061041c9190612804565b611d31565b005b61042b611db4565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361049a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161049190612fe7565b60405180910390fd5b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61050c611e32565b600034905060056000836000015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166105a1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161059890613079565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16836000015173ffffffffffffffffffffffffffffffffffffffff1614610686576106376105e4611e81565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168560200151866000015173ffffffffffffffffffffffffffffffffffffffff16611e89909392919063ffffffff16565b816060015134101561067e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106759061310b565b60405180910390fd5b34905061068e565b826020015190505b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16631b59c2b683866040518363ffffffff1660e01b81526004016106ec919061322b565b60206040518083038185885af115801561070a573d6000803e3d6000fd5b50505050506040513d601f19601f8201168201806040525081019061072f9190613262565b9050610762836000015182600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16611f12565b600061076e828561207f565b9050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638048775e476040518060a00160405280886000015173ffffffffffffffffffffffffffffffffffffffff16815260200188602001518152602001600460008a60200151815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200188604001518152602001858152506040518363ffffffff1660e01b81526004016108649190613305565b6000604051808303818588803b15801561087d57600080fd5b505af1158015610891573d6000803e3d6000fd5b50505050505050506108a16120f1565b5050565b6000816000015173ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614801561092f5750600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b61096e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161096590613373565b60405180910390fd5b81602001518310156109b5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109ac906133df565b60405180910390fd5b82826020018181525050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166342056b9e83600001516040518263ffffffff1660e01b8152600401610a1e9190612d98565b602060405180830381865afa158015610a3b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a5f9190613414565b15610afc57600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166393113b5c8684602001516040518363ffffffff1660e01b8152600401610ac5929190613450565b600060405180830381600087803b158015610adf57600080fd5b505af1158015610af3573d6000803e3d6000fd5b50505050610b4c565b610b38610b07611e81565b308460200151856000015173ffffffffffffffffffffffffffffffffffffffff16611e89909392919063ffffffff16565b610b4b8260400151836020015187611f12565b5b60019050949350505050565b60056020528060005260406000206000915054906101000a900460ff1681565b60046020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160149054906101000a900460ff16908060010160159054906101000a900460ff16905084565b610c0a611db4565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610c79576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c7090612fe7565b60405180910390fd5b610d1d338273ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401610cb69190612d98565b602060405180830381865afa158015610cd3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cf79190613262565b8373ffffffffffffffffffffffffffffffffffffffff166120fa9092919063ffffffff16565b50565b610d28611e32565b600034905060056000836000015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16610dbd576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610db490613079565b60405180910390fd5b8160600151811015610e04576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dfb906134eb565b60405180910390fd5b600460008360200151815260200190815260200160002060010160159054906101000a900460ff1615610fd5576000610e458360a00151602001518461207f565b9050610ea9610e52611e81565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168560a0015160200151866000015173ffffffffffffffffffffffffffffffffffffffff16611e89909392919063ffffffff16565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638048775e836040518060a00160405280876000015173ffffffffffffffffffffffffffffffffffffffff16815260200187602001518152602001600460008960200151815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200187604001518152602001858152506040518363ffffffff1660e01b8152600401610f9d9190613305565b6000604051808303818588803b158015610fb657600080fd5b505af1158015610fca573d6000803e3d6000fd5b505050505050611120565b6000826060015182610fe7919061353a565b90506000610ff5828561207f565b9050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c95a5fb4846040518060a00160405280886000015173ffffffffffffffffffffffffffffffffffffffff16815260200188602001518152602001600460008a60200151815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200188604001518152602001858152506040518363ffffffff1660e01b81526004016110eb9190613305565b6000604051808303818588803b15801561110457600080fd5b505af1158015611118573d6000803e3d6000fd5b505050505050505b506111296120f1565b50565b611134611db4565b61113e6000612180565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b611197611db4565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603611206576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111fd90612fe7565b60405180910390fd5b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b611252611db4565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036112c1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112b890612fe7565b60405180910390fd5b80600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505050565b611324611db4565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603611393576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161138a90612fe7565b60405180910390fd5b6000600460008681526020019081526020016000206040518060800160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160149054906101000a900460ff1660ff1660ff1681526020016001820160159054906101000a900460ff161515151581525050905083816020019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505082816040019060ff16908160ff168152505081816060019015159081151581525050806004600087815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160010160146101000a81548160ff021916908360ff16021790555060608201518160010160156101000a81548160ff0219169083151502179055509050505050505050565b6115e8611e32565b6000349050600073ffffffffffffffffffffffffffffffffffffffff16826000015173ffffffffffffffffffffffffffffffffffffffff161461168857611683611630611e81565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168460200151856000015173ffffffffffffffffffffffffffffffffffffffff16611e89909392919063ffffffff16565b600090505b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16631b59c2b683856040518363ffffffff1660e01b81526004016116e6919061322b565b60206040518083038185885af1158015611704573d6000803e3d6000fd5b50505050506040513d601f19601f820116820180604052508101906117299190613262565b9050600061173b846040015183612244565b905061174c84604001518287611f12565b5050506117576120f1565b5050565b6000816000015173ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480156117e55750600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b611824576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161181b90613373565b60405180910390fd5b816020015183101561186b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611862906133df565b60405180910390fd5b828260200181815250506118b1611880611e81565b308460200151856000015173ffffffffffffffffffffffffffffffffffffffff16611e89909392919063ffffffff16565b60006118c583600001518460200151612244565b9050826040015173ffffffffffffffffffffffffffffffffffffffff16836000015173ffffffffffffffffffffffffffffffffffffffff16036119165761191183604001518288611f12565b611a2d565b611970611921611e81565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683866000015173ffffffffffffffffffffffffffffffffffffffff16611e89909392919063ffffffff16565b808360200181815250506000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16631b59c2b6856040518263ffffffff1660e01b81526004016119d7919061322b565b6020604051808303816000875af11580156119f6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a1a9190613262565b9050611a2b84604001518289611f12565b505b6001915050949350505050565b611a42611db4565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603611ab1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611aa890612fe7565b60405180910390fd5b6000600460008481526020019081526020016000206040518060800160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160149054906101000a900460ff1660ff1660ff1681526020016001820160159054906101000a900460ff161515151581525050905081816000019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050806004600085815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160010160146101000a81548160ff021916908360ff16021790555060608201518160010160156101000a81548160ff021916908315150217905550905050505050565b611ce2611db4565b60003390508073ffffffffffffffffffffffffffffffffffffffff166108fc479081150290604051600060405180830381858888f19350505050158015611d2d573d6000803e3d6000fd5b5050565b611d39611db4565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603611da8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611d9f906135e0565b60405180910390fd5b611db181612180565b50565b611dbc611e81565b73ffffffffffffffffffffffffffffffffffffffff16611dda611140565b73ffffffffffffffffffffffffffffffffffffffff1614611e30576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e279061364c565b60405180910390fd5b565b600260015403611e77576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e6e906136b8565b60405180910390fd5b6002600181905550565b600033905090565b611f0c846323b872dd60e01b858585604051602401611eaa939291906136d8565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050612466565b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361204e576000808273ffffffffffffffffffffffffffffffffffffffff1684604051611f6d90613740565b60006040518083038185875af1925050503d8060008114611faa576040519150601f19603f3d011682016040523d82523d6000602084013e611faf565b606091505b509150915081612005611fc18361252e565b6040518060400160405280601881526020017f4e6174697665205472616e73666572204661696c65643a20000000000000000081525061259990919063ffffffff16565b90612046576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161203d9190613799565b60405180910390fd5b50505061207a565b61207981838573ffffffffffffffffffffffffffffffffffffffff166120fa9092919063ffffffff16565b5b505050565b6060600460008360200151815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168383608001518460a001516040516020016120da94939291906137bb565b604051602081830303815290604052905092915050565b60018081905550565b61217b8363a9059cbb60e01b8484604051602401612119929190613450565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050612466565b505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000806000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663fcee45f4856040518263ffffffff1660e01b81526004016122a49190613807565b6040805180830381865afa1580156122c0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906122e49190613837565b91509150600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1603612424576000808373ffffffffffffffffffffffffffffffffffffffff168360405161234390613740565b60006040518083038185875af1925050503d8060008114612380576040519150601f19603f3d011682016040523d82523d6000602084013e612385565b606091505b5091509150816123db6123978361252e565b6040518060400160405280601881526020017f4e6174697665205472616e73666572204661696c65643a20000000000000000081525061259990919063ffffffff16565b9061241c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016124139190613799565b60405180910390fd5b505050612450565b61244f82828773ffffffffffffffffffffffffffffffffffffffff166120fa9092919063ffffffff16565b5b808461245c919061353a565b9250505092915050565b60006124c8826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166125c59092919063ffffffff16565b90506000815114806124ea5750808060200190518101906124e99190613414565b5b612529576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612520906138e9565b60405180910390fd5b505050565b6060604482511015612577576040518060400160405280601d81526020017f5472616e73616374696f6e2072657665727465642073696c656e746c790000008152509050612594565b6004820191508180602001905181019061259191906139aa565b90505b919050565b606082826040516020016125ae929190613a24565b604051602081830303815290604052905092915050565b60606125d484846000856125dd565b90509392505050565b606082471015612622576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161261990613aba565b60405180910390fd5b6000808673ffffffffffffffffffffffffffffffffffffffff16858760405161264b9190613ada565b60006040518083038185875af1925050503d8060008114612688576040519150601f19603f3d011682016040523d82523d6000602084013e61268d565b606091505b509150915061269e878383876126aa565b92505050949350505050565b6060831561270c576000835103612704576126c48561271f565b612703576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016126fa90613b3d565b60405180910390fd5b5b829050612717565b6127168383612742565b5b949350505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b6000825111156127555781518083602001fd5b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016127899190613799565b60405180910390fd5b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006127d1826127a6565b9050919050565b6127e1816127c6565b81146127ec57600080fd5b50565b6000813590506127fe816127d8565b92915050565b60006020828403121561281a5761281961279c565b5b6000612828848285016127ef565b91505092915050565b6000819050919050565b600061285661285161284c846127a6565b612831565b6127a6565b9050919050565b60006128688261283b565b9050919050565b600061287a8261285d565b9050919050565b61288a8161286f565b82525050565b60006020820190506128a56000830184612881565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6128f9826128b0565b810181811067ffffffffffffffff82111715612918576129176128c1565b5b80604052505050565b600061292b612792565b905061293782826128f0565b919050565b600080fd5b6000819050919050565b61295481612941565b811461295f57600080fd5b50565b6000813590506129718161294b565b92915050565b600080fd5b600080fd5b600067ffffffffffffffff82111561299c5761299b6128c1565b5b6129a5826128b0565b9050602081019050919050565b82818337600083830152505050565b60006129d46129cf84612981565b612921565b9050828152602081018484840111156129f0576129ef61297c565b5b6129fb8482856129b2565b509392505050565b600082601f830112612a1857612a17612977565b5b8135612a288482602086016129c1565b91505092915050565b600060808284031215612a4757612a466128ab565b5b612a516080612921565b90506000612a61848285016127ef565b6000830152506020612a7584828501612962565b6020830152506040612a89848285016127ef565b604083015250606082013567ffffffffffffffff811115612aad57612aac61293c565b5b612ab984828501612a03565b60608301525092915050565b600060c08284031215612adb57612ada6128ab565b5b612ae560c0612921565b90506000612af5848285016127ef565b6000830152506020612b0984828501612962565b6020830152506040612b1d84828501612962565b6040830152506060612b3184828501612962565b6060830152506080612b45848285016127ef565b60808301525060a082013567ffffffffffffffff811115612b6957612b6861293c565b5b612b7584828501612a31565b60a08301525092915050565b60008060408385031215612b9857612b9761279c565b5b600083013567ffffffffffffffff811115612bb657612bb56127a1565b5b612bc285828601612a31565b925050602083013567ffffffffffffffff811115612be357612be26127a1565b5b612bef85828601612ac5565b9150509250929050565b60008060008060808587031215612c1357612c1261279c565b5b6000612c21878288016127ef565b9450506020612c32878288016127ef565b9350506040612c4387828801612962565b925050606085013567ffffffffffffffff811115612c6457612c636127a1565b5b612c7087828801612a31565b91505092959194509250565b60008115159050919050565b612c9181612c7c565b82525050565b6000602082019050612cac6000830184612c88565b92915050565b600060208284031215612cc857612cc761279c565b5b6000612cd684828501612962565b91505092915050565b612ce8816127c6565b82525050565b600060ff82169050919050565b612d0481612cee565b82525050565b6000608082019050612d1f6000830187612cdf565b612d2c6020830186612cdf565b612d396040830185612cfb565b612d466060830184612c88565b95945050505050565b600060208284031215612d6557612d6461279c565b5b600082013567ffffffffffffffff811115612d8357612d826127a1565b5b612d8f84828501612ac5565b91505092915050565b6000602082019050612dad6000830184612cdf565b92915050565b6000612dbe8261285d565b9050919050565b612dce81612db3565b82525050565b6000602082019050612de96000830184612dc5565b92915050565b612df881612c7c565b8114612e0357600080fd5b50565b600081359050612e1581612def565b92915050565b60008060408385031215612e3257612e3161279c565b5b6000612e40858286016127ef565b9250506020612e5185828601612e06565b9150509250929050565b612e6481612cee565b8114612e6f57600080fd5b50565b600081359050612e8181612e5b565b92915050565b60008060008060808587031215612ea157612ea061279c565b5b6000612eaf87828801612962565b9450506020612ec0878288016127ef565b9350506040612ed187828801612e72565b9250506060612ee287828801612e06565b91505092959194509250565b60008060408385031215612f0557612f0461279c565b5b6000612f13858286016127ef565b925050602083013567ffffffffffffffff811115612f3457612f336127a1565b5b612f4085828601612a31565b9150509250929050565b60008060408385031215612f6157612f6061279c565b5b6000612f6f85828601612962565b9250506020612f80858286016127ef565b9150509250929050565b600082825260208201905092915050565b7f356972654875623a5a65726f416464726573734e6f74416c6c6f776564000000600082015250565b6000612fd1601d83612f8a565b9150612fdc82612f9b565b602082019050919050565b6000602082019050818103600083015261300081612fc4565b9050919050565b7f356972654875623a20556e737570706f7274656420427269646765204173736560008201527f7400000000000000000000000000000000000000000000000000000000000000602082015250565b6000613063602183612f8a565b915061306e82613007565b604082019050919050565b6000602082019050818103600083015261309281613056565b9050919050565b7f356972654875623a20496e73756666696369656e2047617320466f722052656d60008201527f6f7465205472616e73616374696f6e0000000000000000000000000000000000602082015250565b60006130f5602f83612f8a565b915061310082613099565b604082019050919050565b60006020820190508181036000830152613124816130e8565b9050919050565b613134816127c6565b82525050565b61314381612941565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b83811015613183578082015181840152602081019050613168565b60008484015250505050565b600061319a82613149565b6131a48185613154565b93506131b4818560208601613165565b6131bd816128b0565b840191505092915050565b60006080830160008301516131e0600086018261312b565b5060208301516131f3602086018261313a565b506040830151613206604086018261312b565b506060830151848203606086015261321e828261318f565b9150508091505092915050565b6000602082019050818103600083015261324581846131c8565b905092915050565b60008151905061325c8161294b565b92915050565b6000602082840312156132785761327761279c565b5b60006132868482850161324d565b91505092915050565b600060a0830160008301516132a7600086018261312b565b5060208301516132ba602086018261313a565b5060408301516132cd604086018261312b565b5060608301516132e0606086018261313a565b50608083015184820360808601526132f8828261318f565b9150508091505092915050565b6000602082019050818103600083015261331f818461328f565b905092915050565b7f356972654875623a20496e76616c696420537570706f727420546f6b656e0000600082015250565b600061335d601e83612f8a565b915061336882613327565b602082019050919050565b6000602082019050818103600083015261338c81613350565b9050919050565b7f356972654875623a20496e76616c69642042726964676520416d740000000000600082015250565b60006133c9601b83612f8a565b91506133d482613393565b602082019050919050565b600060208201905081810360008301526133f8816133bc565b9050919050565b60008151905061340e81612def565b92915050565b60006020828403121561342a5761342961279c565b5b6000613438848285016133ff565b91505092915050565b61344a81612941565b82525050565b60006040820190506134656000830185612cdf565b6134726020830184613441565b9392505050565b7f356972654875623a20496e73756666696369656e742047617320466f7220526560008201527f6d6f7465205472616e73616374696f6e00000000000000000000000000000000602082015250565b60006134d5603083612f8a565b91506134e082613479565b604082019050919050565b60006020820190508181036000830152613504816134c8565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061354582612941565b915061355083612941565b92508282039050818111156135685761356761350b565b5b92915050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b60006135ca602683612f8a565b91506135d58261356e565b604082019050919050565b600060208201905081810360008301526135f9816135bd565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000613636602083612f8a565b915061364182613600565b602082019050919050565b6000602082019050818103600083015261366581613629565b9050919050565b7f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00600082015250565b60006136a2601f83612f8a565b91506136ad8261366c565b602082019050919050565b600060208201905081810360008301526136d181613695565b9050919050565b60006060820190506136ed6000830186612cdf565b6136fa6020830185612cdf565b6137076040830184613441565b949350505050565b600081905092915050565b50565b600061372a60008361370f565b91506137358261371a565b600082019050919050565b600061374b8261371d565b9150819050919050565b600081519050919050565b600061376b82613755565b6137758185612f8a565b9350613785818560208601613165565b61378e816128b0565b840191505092915050565b600060208201905081810360008301526137b38184613760565b905092915050565b60006080820190506137d06000830187612cdf565b6137dd6020830186613441565b6137ea6040830185612cdf565b81810360608301526137fc81846131c8565b905095945050505050565b600060208201905061381c6000830184613441565b92915050565b600081519050613831816127d8565b92915050565b6000806040838503121561384e5761384d61279c565b5b600061385c85828601613822565b925050602061386d8582860161324d565b9150509250929050565b7f5361666545524332303a204552433230206f7065726174696f6e20646964206e60008201527f6f74207375636365656400000000000000000000000000000000000000000000602082015250565b60006138d3602a83612f8a565b91506138de82613877565b604082019050919050565b60006020820190508181036000830152613902816138c6565b9050919050565b600067ffffffffffffffff821115613924576139236128c1565b5b61392d826128b0565b9050602081019050919050565b600061394d61394884613909565b612921565b9050828152602081018484840111156139695761396861297c565b5b613974848285613165565b509392505050565b600082601f83011261399157613990612977565b5b81516139a184826020860161393a565b91505092915050565b6000602082840312156139c0576139bf61279c565b5b600082015167ffffffffffffffff8111156139de576139dd6127a1565b5b6139ea8482850161397c565b91505092915050565b60006139fe82613149565b613a08818561370f565b9350613a18818560208601613165565b80840191505092915050565b6000613a3082856139f3565b9150613a3c82846139f3565b91508190509392505050565b7f416464726573733a20696e73756666696369656e742062616c616e636520666f60008201527f722063616c6c0000000000000000000000000000000000000000000000000000602082015250565b6000613aa4602683612f8a565b9150613aaf82613a48565b604082019050919050565b60006020820190508181036000830152613ad381613a97565b9050919050565b6000613ae682846139f3565b915081905092915050565b7f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000600082015250565b6000613b27601d83612f8a565b9150613b3282613af1565b602082019050919050565b60006020820190508181036000830152613b5681613b1a565b905091905056fea264697066735822122024614c78c0507ff6062f7226157a0362e8433af49b86fad629e38a2233eaeafc64736f6c63430008140033",
    "deployedBytecode": "0x6080604052600436106101185760003560e01c80638da5cb5b116100a0578063cf5ef12811610064578063cf5ef1281461036e578063d06418c91461038a578063d4a34464146103ba578063e086e5ec146103e3578063f2fde38b146103fa5761011f565b80638da5cb5b1461029d578063a757dcfb146102c8578063ad3d298f146102f3578063b959e5621461031c578063c59f1e33146103455761011f565b80632a4f1621116100e75780632a4f1621146101c45780632d7fb17a1461020157806351cff8d914610241578063674611c91461026a578063715018a6146102865761011f565b80630a4417de146101245780630bd71f3a1461014d5780630e71b30c146101785780630f9f674a146101945761011f565b3661011f57005b600080fd5b34801561013057600080fd5b5061014b60048036038101906101469190612804565b610423565b005b34801561015957600080fd5b506101626104de565b60405161016f9190612890565b60405180910390f35b610192600480360381019061018d9190612b81565b610504565b005b6101ae60048036038101906101a99190612bf9565b6108a5565b6040516101bb9190612c97565b60405180910390f35b3480156101d057600080fd5b506101eb60048036038101906101e69190612804565b610b58565b6040516101f89190612c97565b60405180910390f35b34801561020d57600080fd5b5061022860048036038101906102239190612cb2565b610b78565b6040516102389493929190612d0a565b60405180910390f35b34801561024d57600080fd5b5061026860048036038101906102639190612804565b610c02565b005b610284600480360381019061027f9190612d4f565b610d20565b005b34801561029257600080fd5b5061029b61112c565b005b3480156102a957600080fd5b506102b2611140565b6040516102bf9190612d98565b60405180910390f35b3480156102d457600080fd5b506102dd611169565b6040516102ea9190612dd4565b60405180910390f35b3480156102ff57600080fd5b5061031a60048036038101906103159190612804565b61118f565b005b34801561032857600080fd5b50610343600480360381019061033e9190612e1b565b61124a565b005b34801561035157600080fd5b5061036c60048036038101906103679190612e87565b61131c565b005b61038860048036038101906103839190612eee565b6115e0565b005b6103a4600480360381019061039f9190612bf9565b61175b565b6040516103b19190612c97565b60405180910390f35b3480156103c657600080fd5b506103e160048036038101906103dc9190612f4a565b611a3a565b005b3480156103ef57600080fd5b506103f8611cda565b005b34801561040657600080fd5b50610421600480360381019061041c9190612804565b611d31565b005b61042b611db4565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361049a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161049190612fe7565b60405180910390fd5b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61050c611e32565b600034905060056000836000015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166105a1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161059890613079565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16836000015173ffffffffffffffffffffffffffffffffffffffff1614610686576106376105e4611e81565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168560200151866000015173ffffffffffffffffffffffffffffffffffffffff16611e89909392919063ffffffff16565b816060015134101561067e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106759061310b565b60405180910390fd5b34905061068e565b826020015190505b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16631b59c2b683866040518363ffffffff1660e01b81526004016106ec919061322b565b60206040518083038185885af115801561070a573d6000803e3d6000fd5b50505050506040513d601f19601f8201168201806040525081019061072f9190613262565b9050610762836000015182600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16611f12565b600061076e828561207f565b9050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638048775e476040518060a00160405280886000015173ffffffffffffffffffffffffffffffffffffffff16815260200188602001518152602001600460008a60200151815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200188604001518152602001858152506040518363ffffffff1660e01b81526004016108649190613305565b6000604051808303818588803b15801561087d57600080fd5b505af1158015610891573d6000803e3d6000fd5b50505050505050506108a16120f1565b5050565b6000816000015173ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614801561092f5750600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b61096e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161096590613373565b60405180910390fd5b81602001518310156109b5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109ac906133df565b60405180910390fd5b82826020018181525050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166342056b9e83600001516040518263ffffffff1660e01b8152600401610a1e9190612d98565b602060405180830381865afa158015610a3b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a5f9190613414565b15610afc57600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166393113b5c8684602001516040518363ffffffff1660e01b8152600401610ac5929190613450565b600060405180830381600087803b158015610adf57600080fd5b505af1158015610af3573d6000803e3d6000fd5b50505050610b4c565b610b38610b07611e81565b308460200151856000015173ffffffffffffffffffffffffffffffffffffffff16611e89909392919063ffffffff16565b610b4b8260400151836020015187611f12565b5b60019050949350505050565b60056020528060005260406000206000915054906101000a900460ff1681565b60046020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160149054906101000a900460ff16908060010160159054906101000a900460ff16905084565b610c0a611db4565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610c79576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c7090612fe7565b60405180910390fd5b610d1d338273ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401610cb69190612d98565b602060405180830381865afa158015610cd3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cf79190613262565b8373ffffffffffffffffffffffffffffffffffffffff166120fa9092919063ffffffff16565b50565b610d28611e32565b600034905060056000836000015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16610dbd576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610db490613079565b60405180910390fd5b8160600151811015610e04576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dfb906134eb565b60405180910390fd5b600460008360200151815260200190815260200160002060010160159054906101000a900460ff1615610fd5576000610e458360a00151602001518461207f565b9050610ea9610e52611e81565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168560a0015160200151866000015173ffffffffffffffffffffffffffffffffffffffff16611e89909392919063ffffffff16565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638048775e836040518060a00160405280876000015173ffffffffffffffffffffffffffffffffffffffff16815260200187602001518152602001600460008960200151815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200187604001518152602001858152506040518363ffffffff1660e01b8152600401610f9d9190613305565b6000604051808303818588803b158015610fb657600080fd5b505af1158015610fca573d6000803e3d6000fd5b505050505050611120565b6000826060015182610fe7919061353a565b90506000610ff5828561207f565b9050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c95a5fb4846040518060a00160405280886000015173ffffffffffffffffffffffffffffffffffffffff16815260200188602001518152602001600460008a60200151815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200188604001518152602001858152506040518363ffffffff1660e01b81526004016110eb9190613305565b6000604051808303818588803b15801561110457600080fd5b505af1158015611118573d6000803e3d6000fd5b505050505050505b506111296120f1565b50565b611134611db4565b61113e6000612180565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b611197611db4565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603611206576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111fd90612fe7565b60405180910390fd5b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b611252611db4565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036112c1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112b890612fe7565b60405180910390fd5b80600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505050565b611324611db4565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603611393576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161138a90612fe7565b60405180910390fd5b6000600460008681526020019081526020016000206040518060800160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160149054906101000a900460ff1660ff1660ff1681526020016001820160159054906101000a900460ff161515151581525050905083816020019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505082816040019060ff16908160ff168152505081816060019015159081151581525050806004600087815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160010160146101000a81548160ff021916908360ff16021790555060608201518160010160156101000a81548160ff0219169083151502179055509050505050505050565b6115e8611e32565b6000349050600073ffffffffffffffffffffffffffffffffffffffff16826000015173ffffffffffffffffffffffffffffffffffffffff161461168857611683611630611e81565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168460200151856000015173ffffffffffffffffffffffffffffffffffffffff16611e89909392919063ffffffff16565b600090505b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16631b59c2b683856040518363ffffffff1660e01b81526004016116e6919061322b565b60206040518083038185885af1158015611704573d6000803e3d6000fd5b50505050506040513d601f19601f820116820180604052508101906117299190613262565b9050600061173b846040015183612244565b905061174c84604001518287611f12565b5050506117576120f1565b5050565b6000816000015173ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480156117e55750600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b611824576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161181b90613373565b60405180910390fd5b816020015183101561186b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611862906133df565b60405180910390fd5b828260200181815250506118b1611880611e81565b308460200151856000015173ffffffffffffffffffffffffffffffffffffffff16611e89909392919063ffffffff16565b60006118c583600001518460200151612244565b9050826040015173ffffffffffffffffffffffffffffffffffffffff16836000015173ffffffffffffffffffffffffffffffffffffffff16036119165761191183604001518288611f12565b611a2d565b611970611921611e81565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683866000015173ffffffffffffffffffffffffffffffffffffffff16611e89909392919063ffffffff16565b808360200181815250506000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16631b59c2b6856040518263ffffffff1660e01b81526004016119d7919061322b565b6020604051808303816000875af11580156119f6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a1a9190613262565b9050611a2b84604001518289611f12565b505b6001915050949350505050565b611a42611db4565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603611ab1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611aa890612fe7565b60405180910390fd5b6000600460008481526020019081526020016000206040518060800160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160149054906101000a900460ff1660ff1660ff1681526020016001820160159054906101000a900460ff161515151581525050905081816000019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050806004600085815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160010160146101000a81548160ff021916908360ff16021790555060608201518160010160156101000a81548160ff021916908315150217905550905050505050565b611ce2611db4565b60003390508073ffffffffffffffffffffffffffffffffffffffff166108fc479081150290604051600060405180830381858888f19350505050158015611d2d573d6000803e3d6000fd5b5050565b611d39611db4565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603611da8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611d9f906135e0565b60405180910390fd5b611db181612180565b50565b611dbc611e81565b73ffffffffffffffffffffffffffffffffffffffff16611dda611140565b73ffffffffffffffffffffffffffffffffffffffff1614611e30576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e279061364c565b60405180910390fd5b565b600260015403611e77576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e6e906136b8565b60405180910390fd5b6002600181905550565b600033905090565b611f0c846323b872dd60e01b858585604051602401611eaa939291906136d8565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050612466565b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361204e576000808273ffffffffffffffffffffffffffffffffffffffff1684604051611f6d90613740565b60006040518083038185875af1925050503d8060008114611faa576040519150601f19603f3d011682016040523d82523d6000602084013e611faf565b606091505b509150915081612005611fc18361252e565b6040518060400160405280601881526020017f4e6174697665205472616e73666572204661696c65643a20000000000000000081525061259990919063ffffffff16565b90612046576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161203d9190613799565b60405180910390fd5b50505061207a565b61207981838573ffffffffffffffffffffffffffffffffffffffff166120fa9092919063ffffffff16565b5b505050565b6060600460008360200151815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168383608001518460a001516040516020016120da94939291906137bb565b604051602081830303815290604052905092915050565b60018081905550565b61217b8363a9059cbb60e01b8484604051602401612119929190613450565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050612466565b505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000806000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663fcee45f4856040518263ffffffff1660e01b81526004016122a49190613807565b6040805180830381865afa1580156122c0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906122e49190613837565b91509150600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1603612424576000808373ffffffffffffffffffffffffffffffffffffffff168360405161234390613740565b60006040518083038185875af1925050503d8060008114612380576040519150601f19603f3d011682016040523d82523d6000602084013e612385565b606091505b5091509150816123db6123978361252e565b6040518060400160405280601881526020017f4e6174697665205472616e73666572204661696c65643a20000000000000000081525061259990919063ffffffff16565b9061241c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016124139190613799565b60405180910390fd5b505050612450565b61244f82828773ffffffffffffffffffffffffffffffffffffffff166120fa9092919063ffffffff16565b5b808461245c919061353a565b9250505092915050565b60006124c8826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166125c59092919063ffffffff16565b90506000815114806124ea5750808060200190518101906124e99190613414565b5b612529576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612520906138e9565b60405180910390fd5b505050565b6060604482511015612577576040518060400160405280601d81526020017f5472616e73616374696f6e2072657665727465642073696c656e746c790000008152509050612594565b6004820191508180602001905181019061259191906139aa565b90505b919050565b606082826040516020016125ae929190613a24565b604051602081830303815290604052905092915050565b60606125d484846000856125dd565b90509392505050565b606082471015612622576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161261990613aba565b60405180910390fd5b6000808673ffffffffffffffffffffffffffffffffffffffff16858760405161264b9190613ada565b60006040518083038185875af1925050503d8060008114612688576040519150601f19603f3d011682016040523d82523d6000602084013e61268d565b606091505b509150915061269e878383876126aa565b92505050949350505050565b6060831561270c576000835103612704576126c48561271f565b612703576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016126fa90613b3d565b60405180910390fd5b5b829050612717565b6127168383612742565b5b949350505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b6000825111156127555781518083602001fd5b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016127899190613799565b60405180910390fd5b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006127d1826127a6565b9050919050565b6127e1816127c6565b81146127ec57600080fd5b50565b6000813590506127fe816127d8565b92915050565b60006020828403121561281a5761281961279c565b5b6000612828848285016127ef565b91505092915050565b6000819050919050565b600061285661285161284c846127a6565b612831565b6127a6565b9050919050565b60006128688261283b565b9050919050565b600061287a8261285d565b9050919050565b61288a8161286f565b82525050565b60006020820190506128a56000830184612881565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6128f9826128b0565b810181811067ffffffffffffffff82111715612918576129176128c1565b5b80604052505050565b600061292b612792565b905061293782826128f0565b919050565b600080fd5b6000819050919050565b61295481612941565b811461295f57600080fd5b50565b6000813590506129718161294b565b92915050565b600080fd5b600080fd5b600067ffffffffffffffff82111561299c5761299b6128c1565b5b6129a5826128b0565b9050602081019050919050565b82818337600083830152505050565b60006129d46129cf84612981565b612921565b9050828152602081018484840111156129f0576129ef61297c565b5b6129fb8482856129b2565b509392505050565b600082601f830112612a1857612a17612977565b5b8135612a288482602086016129c1565b91505092915050565b600060808284031215612a4757612a466128ab565b5b612a516080612921565b90506000612a61848285016127ef565b6000830152506020612a7584828501612962565b6020830152506040612a89848285016127ef565b604083015250606082013567ffffffffffffffff811115612aad57612aac61293c565b5b612ab984828501612a03565b60608301525092915050565b600060c08284031215612adb57612ada6128ab565b5b612ae560c0612921565b90506000612af5848285016127ef565b6000830152506020612b0984828501612962565b6020830152506040612b1d84828501612962565b6040830152506060612b3184828501612962565b6060830152506080612b45848285016127ef565b60808301525060a082013567ffffffffffffffff811115612b6957612b6861293c565b5b612b7584828501612a31565b60a08301525092915050565b60008060408385031215612b9857612b9761279c565b5b600083013567ffffffffffffffff811115612bb657612bb56127a1565b5b612bc285828601612a31565b925050602083013567ffffffffffffffff811115612be357612be26127a1565b5b612bef85828601612ac5565b9150509250929050565b60008060008060808587031215612c1357612c1261279c565b5b6000612c21878288016127ef565b9450506020612c32878288016127ef565b9350506040612c4387828801612962565b925050606085013567ffffffffffffffff811115612c6457612c636127a1565b5b612c7087828801612a31565b91505092959194509250565b60008115159050919050565b612c9181612c7c565b82525050565b6000602082019050612cac6000830184612c88565b92915050565b600060208284031215612cc857612cc761279c565b5b6000612cd684828501612962565b91505092915050565b612ce8816127c6565b82525050565b600060ff82169050919050565b612d0481612cee565b82525050565b6000608082019050612d1f6000830187612cdf565b612d2c6020830186612cdf565b612d396040830185612cfb565b612d466060830184612c88565b95945050505050565b600060208284031215612d6557612d6461279c565b5b600082013567ffffffffffffffff811115612d8357612d826127a1565b5b612d8f84828501612ac5565b91505092915050565b6000602082019050612dad6000830184612cdf565b92915050565b6000612dbe8261285d565b9050919050565b612dce81612db3565b82525050565b6000602082019050612de96000830184612dc5565b92915050565b612df881612c7c565b8114612e0357600080fd5b50565b600081359050612e1581612def565b92915050565b60008060408385031215612e3257612e3161279c565b5b6000612e40858286016127ef565b9250506020612e5185828601612e06565b9150509250929050565b612e6481612cee565b8114612e6f57600080fd5b50565b600081359050612e8181612e5b565b92915050565b60008060008060808587031215612ea157612ea061279c565b5b6000612eaf87828801612962565b9450506020612ec0878288016127ef565b9350506040612ed187828801612e72565b9250506060612ee287828801612e06565b91505092959194509250565b60008060408385031215612f0557612f0461279c565b5b6000612f13858286016127ef565b925050602083013567ffffffffffffffff811115612f3457612f336127a1565b5b612f4085828601612a31565b9150509250929050565b60008060408385031215612f6157612f6061279c565b5b6000612f6f85828601612962565b9250506020612f80858286016127ef565b9150509250929050565b600082825260208201905092915050565b7f356972654875623a5a65726f416464726573734e6f74416c6c6f776564000000600082015250565b6000612fd1601d83612f8a565b9150612fdc82612f9b565b602082019050919050565b6000602082019050818103600083015261300081612fc4565b9050919050565b7f356972654875623a20556e737570706f7274656420427269646765204173736560008201527f7400000000000000000000000000000000000000000000000000000000000000602082015250565b6000613063602183612f8a565b915061306e82613007565b604082019050919050565b6000602082019050818103600083015261309281613056565b9050919050565b7f356972654875623a20496e73756666696369656e2047617320466f722052656d60008201527f6f7465205472616e73616374696f6e0000000000000000000000000000000000602082015250565b60006130f5602f83612f8a565b915061310082613099565b604082019050919050565b60006020820190508181036000830152613124816130e8565b9050919050565b613134816127c6565b82525050565b61314381612941565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b83811015613183578082015181840152602081019050613168565b60008484015250505050565b600061319a82613149565b6131a48185613154565b93506131b4818560208601613165565b6131bd816128b0565b840191505092915050565b60006080830160008301516131e0600086018261312b565b5060208301516131f3602086018261313a565b506040830151613206604086018261312b565b506060830151848203606086015261321e828261318f565b9150508091505092915050565b6000602082019050818103600083015261324581846131c8565b905092915050565b60008151905061325c8161294b565b92915050565b6000602082840312156132785761327761279c565b5b60006132868482850161324d565b91505092915050565b600060a0830160008301516132a7600086018261312b565b5060208301516132ba602086018261313a565b5060408301516132cd604086018261312b565b5060608301516132e0606086018261313a565b50608083015184820360808601526132f8828261318f565b9150508091505092915050565b6000602082019050818103600083015261331f818461328f565b905092915050565b7f356972654875623a20496e76616c696420537570706f727420546f6b656e0000600082015250565b600061335d601e83612f8a565b915061336882613327565b602082019050919050565b6000602082019050818103600083015261338c81613350565b9050919050565b7f356972654875623a20496e76616c69642042726964676520416d740000000000600082015250565b60006133c9601b83612f8a565b91506133d482613393565b602082019050919050565b600060208201905081810360008301526133f8816133bc565b9050919050565b60008151905061340e81612def565b92915050565b60006020828403121561342a5761342961279c565b5b6000613438848285016133ff565b91505092915050565b61344a81612941565b82525050565b60006040820190506134656000830185612cdf565b6134726020830184613441565b9392505050565b7f356972654875623a20496e73756666696369656e742047617320466f7220526560008201527f6d6f7465205472616e73616374696f6e00000000000000000000000000000000602082015250565b60006134d5603083612f8a565b91506134e082613479565b604082019050919050565b60006020820190508181036000830152613504816134c8565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061354582612941565b915061355083612941565b92508282039050818111156135685761356761350b565b5b92915050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b60006135ca602683612f8a565b91506135d58261356e565b604082019050919050565b600060208201905081810360008301526135f9816135bd565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000613636602083612f8a565b915061364182613600565b602082019050919050565b6000602082019050818103600083015261366581613629565b9050919050565b7f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00600082015250565b60006136a2601f83612f8a565b91506136ad8261366c565b602082019050919050565b600060208201905081810360008301526136d181613695565b9050919050565b60006060820190506136ed6000830186612cdf565b6136fa6020830185612cdf565b6137076040830184613441565b949350505050565b600081905092915050565b50565b600061372a60008361370f565b91506137358261371a565b600082019050919050565b600061374b8261371d565b9150819050919050565b600081519050919050565b600061376b82613755565b6137758185612f8a565b9350613785818560208601613165565b61378e816128b0565b840191505092915050565b600060208201905081810360008301526137b38184613760565b905092915050565b60006080820190506137d06000830187612cdf565b6137dd6020830186613441565b6137ea6040830185612cdf565b81810360608301526137fc81846131c8565b905095945050505050565b600060208201905061381c6000830184613441565b92915050565b600081519050613831816127d8565b92915050565b6000806040838503121561384e5761384d61279c565b5b600061385c85828601613822565b925050602061386d8582860161324d565b9150509250929050565b7f5361666545524332303a204552433230206f7065726174696f6e20646964206e60008201527f6f74207375636365656400000000000000000000000000000000000000000000602082015250565b60006138d3602a83612f8a565b91506138de82613877565b604082019050919050565b60006020820190508181036000830152613902816138c6565b9050919050565b600067ffffffffffffffff821115613924576139236128c1565b5b61392d826128b0565b9050602081019050919050565b600061394d61394884613909565b612921565b9050828152602081018484840111156139695761396861297c565b5b613974848285613165565b509392505050565b600082601f83011261399157613990612977565b5b81516139a184826020860161393a565b91505092915050565b6000602082840312156139c0576139bf61279c565b5b600082015167ffffffffffffffff8111156139de576139dd6127a1565b5b6139ea8482850161397c565b91505092915050565b60006139fe82613149565b613a08818561370f565b9350613a18818560208601613165565b80840191505092915050565b6000613a3082856139f3565b9150613a3c82846139f3565b91508190509392505050565b7f416464726573733a20696e73756666696369656e742062616c616e636520666f60008201527f722063616c6c0000000000000000000000000000000000000000000000000000602082015250565b6000613aa4602683612f8a565b9150613aaf82613a48565b604082019050919050565b60006020820190508181036000830152613ad381613a97565b9050919050565b6000613ae682846139f3565b915081905092915050565b7f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000600082015250565b6000613b27601d83612f8a565b9150613b3282613af1565b602082019050919050565b60006020820190508181036000830152613b5681613b1a565b905091905056fea264697066735822122024614c78c0507ff6062f7226157a0362e8433af49b86fad629e38a2233eaeafc64736f6c63430008140033",
    "linkReferences": {},
    "deployedLinkReferences": {}
}