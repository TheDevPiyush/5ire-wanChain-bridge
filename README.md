# WanChain Bridge App - Bridge Native 5ire Currency

WanChain App is a cross-chain solution that allows you to bridge native 5ire (5IRE) tokens from the 5ireChain to other Ethereum-based networks as ERC20 tokens—and vice versa. This repository contains the code, configuration files, and documentation for setting up and running the bridging service.

## Overview
The WanChain App facilitates seamless transfer of 5IRE tokens between the 5ireChain network and other EVM-compatible chains, such as Polygon or other networks supporting the ERC20 standard. The goal is to enable users to:

- Convert native 5IRE into ERC20 5IRE on external chains.
- Convert ERC20 5IRE back into native 5IRE on 5ireChain.


## Working

To BRIDGE-OUT **(5ire -> EVM)**
- specify the amount of 5ire native tokens you want to transfer
- Select the destination chain and hit Confirm
- Import the 5ire ERC20 Currency on destination network in your wallet - ``` 0x999A50941c934DF44b045Ab15e3Fb08e22607eC9 ```

To BRIDGE-IN **(EVM - 5ire)**
- Select your EVM chain in the app
- Make sure you have imported and enough balance in your wallet
- Specify the amount you want to transfer back on 5ireChain.
- Hit confirm, your native 5ire currency will be updated.


## Contribution

To contibute to the code :

- Clone the repo : 
     ```https://github.com/5ire-tech/5ire-bridge-app.git```

- Install the dependencies, in case of dependencies issues use ``` --force ``` :
    ```npm i```

- Run the developemt server : 
    ```npm run dev```


## Authors

- [@TheDevPiyush](https://www.github.com/thedevpiyush)

