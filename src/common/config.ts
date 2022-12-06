// export const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL!;
export const serverUrl = `http://192.168.104.17:5000`;
// add your api routes here...
export const routes = {
  news: serverUrl + "/news",
  drops: serverUrl + "/drop",
  guides: serverUrl + "/guide",
  advert: serverUrl + "/advertise",
  services: serverUrl + "/our-service",
  category: serverUrl + "/category",
};

export const API_URL = `${serverUrl}/api/v1`;

export const MARKETPLACES_API = {
  FEATURED_COLLECTIONS: `${API_URL}/banner`,
  UPCOMING_LAUNCHES: `${API_URL}/collection/upcoming`,
  NEW_COLLECTIONS: `${API_URL}/collection/new`,
  POPULAR_COLLECTIONS: `${API_URL}/collection/popular`,
  DISCOUNTED_NFTS: `${API_URL}/nft/discounted`,

  GET_COLLECTION_STATE: `${API_URL}/collection/symbol/statistic`,

  ALL_COLLECTIONS: `${API_URL}/collection/all`,
  GET_COLLECTION_DATA: `${API_URL}/collection/symbol/`,
  GET_ACTIVITY_WALLET: `${API_URL}/activity/wallet/`,
  GET_ACTIVITY_COLLECTION: `${API_URL}/activity/collection/`,

  GET_ITEM_DETAIL: `${API_URL}/nft/item/`,
  GET_BID_WALLET: `${API_URL}/bid/wallet/`,

  GET_COLLECTION_NFTS: `${API_URL}/getListedNFTsByQuery`,
  GET_NFT_DATA: `${API_URL}/bid/getBids?walletAddress=`,
  GET_NFTS_WALLET: `${API_URL}/nft/wallet/`,

  GET_BUY_TX: `${API_URL}/nft/buytx`,
  GET_BUY_TX_CONF: `${API_URL}/nft/buy`,
  GET_MAKEBID_TX: `${API_URL}/bid/maketx`,
  GET_CANCELBID_TX: `${API_URL}/bid/canceltx`,
  GET_CANCELBID_TX_CONF: `${API_URL}/bid/cancel`,
  GET_MAKEBID_TX_CONF: `${API_URL}/bid`,
  GET_ACCEPTBID_TX: `${API_URL}/bid/accepttx`,
  GET_ACCEPTBID_TX_CONF: `${API_URL}/bid/accept`,
  GET_MAKELSIT_TX: `${API_URL}/nft/listtx`,
  GET_MAKELSIT_TX_CONF: `${API_URL}/nft/list`,
  GET_UPDATE_NFT_TX: `${API_URL}/nft/updatelisttx`,
  GET_UPDATE_NFT_TX_CONF: `${API_URL}/nft/updatelist`,
  GET_UNLIST_NFT_TX: `${API_URL}/nft/unlisttx`,
  GET_UNLIST_NFT_TX_CONF: `${API_URL}/nft/unlist`,

  GET_STATISTICS: `${API_URL}/nft/statistics`,

  GET_RPC: `${API_URL}/setting/rpc`,
}

export const GET_SOL_PRICE = `https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd,eur`;

export const ACTIVITY_TYPE = [
  {
    color: ``,
    text: ``
  },
  {
    color: `#22C55E`,
    text: `On Sale`
  },
  {
    color: `#A1A1AA`,
    text: `Canceled List`
  },
  {
    color: `#17A2B8`,
    text: `Update List`
  },
  {
    color: `#3B82F6`,
    text: `Buy`
  },
  {
    color: `#EAB308`,
    text: `Placed Bid`
  }, {
    color: `#FFFFFF`,
    text: `Update Bid`
  },
  {
    color: `#EF4444`,
    text: `Canceled Bid`
  },
  {
    color: `#42F5B3`,
    text: `Accept Bid`
  }
]
