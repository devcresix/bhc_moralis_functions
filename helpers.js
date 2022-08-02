async function getMyNfts(request) {
  let options = { chain: "bsc", address: request.params.address };
  const results = await Moralis.Web3API.account.getNFTs(options);
  return results;
}

async function getCreatedNfts(request) {
  const query = new Moralis.Query("bscCreatedNFTs");
  query
    .equalTo("creator", request.params.address)
    .equalTo("confirmed", true)
    .limit(1000000000000000000);
  const nfts = await query.find();
  let createdNfts = [];
  for (let i = 0; i < nfts.length; i++) {
    try {
      //let options = { address: nfts[i].get("collection"), token_id: nfts[i].get("uid"), chain: "bsc" };
      //const tokenIdMetadata = await Moralis.Web3API.token.getTokenIdMetadata(options);
      //createdNfts.push({...nfts[i],...tokenIdMetadata})
      createdNfts.push({
        token_address: nfts[i].get("collection"),
        token_id: nfts[i].get("uid"),
      });
    } catch (e) {}
  }
  return createdNfts;
}

async function getOwners(request) {
  let options = {
    chain: "bsc",
    address: request.params.address,
    token_id: request.params.token_id,
    offset: 0,
    limit: 1000,
  };
  const tokenIdOwners = await Moralis.Web3API.token.getTokenIdOwners(options);
  const owners = [];
  for (let i = 0; i < tokenIdOwners.result.length; i++) {
    owners.push({
      owner: tokenIdOwners.result[i]["owner_of"],
      amount: tokenIdOwners.result[i]["amount"],
    });
  }
  return owners;
}

async function getUsers() {
  const query1 = new Moralis.Query("bscCreatedNFTs");
  const query2 = new Moralis.Query("ExchangesNew");
  const query3 = new Moralis.Query("AuctionsNew");
  const query4 = new Moralis.Query("SoldOld");
  const query5 = new Moralis.Query("BoughtOld");
  query1.equalTo("confirmed", true).limit(1000000000000000000);
  query2.equalTo("confirmed", true).limit(1000000000000000000);
  query3.equalTo("confirmed", true).limit(1000000000000000000);
  query4.equalTo("confirmed", true).limit(1000000000000000000);
  query5.equalTo("confirmed", true).limit(1000000000000000000);
  const data1 = await query1.find();
  const data2 = await query2.find();
  const data3 = await query3.find();
  const data4 = await query4.find();
  const data5 = await query5.find();
  let usersAll = [];
  let users = [];
  for (let i = 0; i < data1.length; i++) {
    usersAll.push(data1[i].get("creator"));
  }
  for (let i = 0; i < data2.length; i++) {
    usersAll.push(data2[i].get("seller"));
    usersAll.push(data2[i].get("buyer"));
  }
  for (let i = 0; i < data4.length; i++) {
    usersAll.push(data4[i].get("seller"));
  }
  for (let i = 0; i < data5.length; i++) {
    usersAll.push(data5[i].get("buyer"));
  }
  users = [...new Set(usersAll)];
  let count = users.length;
  return { count: count, users: users };
}

async function getAllNfts() {
  const query = new Moralis.Query("bscCreatedNFTs");
  query.equalTo("confirmed", true).limit(1000000000000000000);
  const nfts = await query.find();
  const minted = [];

  for (let i = 0; i < nfts.length; i++) {
    let nft = nfts[i];
    minted.push({
      creator: nft.get("creator"),
      collection: nft.get("collection"),
      id: nft.get("uid"),
    });
  }

  return { count: minted.length, mints: minted };
}
