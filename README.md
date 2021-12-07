# Solana NFT Project with Metaplex candy machine and Arweave
### Deploys NFT assests to Metaplex NFT contract on Solana. Mint NFT functionality on the frontend.

### To run React frontend
1. cd into the `app` folder
2. Run `npm install` at the root of your directory
3. Run `npm run start` to start the project

### To deploy assests to Solana devnet
1. Create solana keypair, airdrop sols and point to devnet
```shell
solana-keygen new --outfile ~/.config/solana/devnet.json
solana config set --keypair ~/.config/solana/devnet.json
solana airdrop 5
```
2. Install Metaplex
```shell
git clone --branch v1.0.0 https://github.com/metaplex-foundation/metaplex.git ~/metaplex-foundation/metaplex
yarn install --cwd ~/metaplex-foundation/metaplex/js/
```
3. Upload assests in assests folder to Arweave using Metaplex CLI
```shell
ts-node ~/metaplex-foundation/metaplex/js/packages/cli/src/candy-machine-cli.ts upload ./assets --env devnet --keypair ~/.config/solana/devnet.json
```
4. Deploy candy machine to devnet
```shell
ts-node ~/metaplex-foundation/metaplex/js/packages/cli/src/candy-machine-cli.ts create_candy_machine --env devnet --keypair ~/.config/solana/devnet.json -p 1
```
5. Set drop date for minting NFTs
```shell
ts-node ~/metaplex-foundation/metaplex/js/packages/cli/src/candy-machine-cli.ts update_candy_machine --date "1 Dec 2021 00:12:00 GMT" --env devnet --keypair ~/.config/solana/devnet.json
```
6. Add .env file with following variables. Set the value for these variables as in .cache/devnet-temp.
```shell
REACT_APP_CANDY_MACHINE_CONFIG=
REACT_APP_CANDY_MACHINE_ID=
REACT_APP_TREASURY_ADDRESS=
REACT_APP_SOLANA_NETWORK=
REACT_APP_SOLANA_RPC_HOST=
```

### At this point you should be able to interact with your candy machine from frontend.

