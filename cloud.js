Moralis.Cloud.define("myNfts", async (request) => {
  return getMyNfts(request);
});

Moralis.Cloud.define("createdNfts", async (request) => {
  return getCreatedNfts(request);
});

Moralis.Cloud.define("owners", async (request) => {
  return getOwners(request);
});

Moralis.Cloud.define("users", async (request) => {
  return getUsers();
});

Moralis.Cloud.define("allnfts", async (request) => {
  return getAllNfts();
});
