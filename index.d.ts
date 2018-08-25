// Type definitions for bitfinex-api-node
// Project: https://github.com/bitfinexcom/bitfinex-api-node
// Definitions by: Louis Hill https://github.com/nonamenonumber
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import { EventEmitter } from "events";

interface IBFXOpts {
  apiKey?: string;
  apiSecret?: string;
  transform?: false;
  ws?: any;
  rest?: any;
}

declare class BFX {
  constructor(opts: IBFXOpts);
  rest(version: number, extraOpts: any): BFX.RESTv2;
  ws(version: number, extraOpts: any): BFX.WSv2;
}

declare namespace BFX {
  class RESTv1 {

  }

  interface IRESTv2Opts {
    apiKey?: string;
    apiSecret?: string;
    transform?: false;
    agent?: any;
  }

  interface IRestv2Candles {
    timeframe?: string;
    symbol?: string;
    section?: string;
    query?: any;
  }

  namespace Models {
    namespace Model {
      function unserialize(data: any, fields: any, boolFields: any, fieldKeys: any): any;
    }
    class Model extends EventEmitter {
      constructor(data: any, fields: any, boolFields: any[], fieldKeys: any[]);
      serialize(): any[];
      toJS(): any;
    }


    interface IOrderFields {
      id?: number,
      gid?: number,
      cid: number,
      symbol: string,
      mtsCreate?: number,
      mtsUpdate?: number,
      amount: number,
      amountOrig?: number,
      type: string,
      typePrev?: string,
      flags?: number,
      status?: string,
      price?: number,
      priceAvg?: number,
      priceTrailing?: number,
      priceAuxLimit?: number,
      notify?: string,
      placedId?: number,
    }
    class Order extends Model {
      id: number; // ?
      gid: number; // ?
      cid: number;
      symbol: string;
      mtsCreate: number; // ?
      mtsUpdate: number; // ?
      amount: number;
      amountOrig: number; // ?
      type: string;
      typePrev: string; // ?
      flags: number; // ?
      status: string; // ?
      price: number; // ?
      priceAvg: number; // ?
      priceTrailing: number; // ?
      priceAuxLimit: number; // ?
      notify: string; // ?
      placedId: number; // ?
      constructor(data: IOrderFields, ws?: WSv2);
      isOCO(): boolean;
      isHidden(): boolean;
      isPostOnly(): boolean;
      includesVariableRates(): boolean;
      isPositionClose(): boolean;
      isReduceOnly(): boolean;
      setOCO(v: boolean, stopPrice?: number): void;
      setHidden(v: boolean): void;
      setPostOnly(v: boolean): void;
      setNoVariableRates(v: boolean): void;
      setPositionClose(v: boolean): void;
      setReduceOnly(v: boolean): void;
      update(changes: any, ws?: WSv2): Promise<any>;
      toPreview(): any;
      registerListeners(ws?: WSv2): void;
      removeListeners(ws?: WSv2): void;
      cbGID(): string;
      submit(ws?: WSv2): Promise<any>;
      cancel(ws?: WSv2): Promise<any>;
      recreate(ws?: WSv2): Promise<any>;
      getLastFillAmount(): number;
      getBaseCurrency(): string;
      getQuoteCurrency(): string;
      getNotionalValue(): number;
      isPartiallyFilled(): boolean;
      toNewOrderPacket(): any;
    }

    namespace Order {
      function getBaseCurrency(arr: any[]): string;
      function getQuoteCurrency(arr: any[]): string;
      enum flags {
        OCO = 2 ** 14, // 16384
        POSTONLY = 2 ** 12, // 4096
        HIDDEN = 2 ** 6, // 64
        NO_VR = 2 ** 19, // 524288
        POS_CLOSE = 2 ** 9, // 512
        REDUCE_ONLY = 2 ** 10 // 1024
      }
      enum status {
        ACTIVE = 'ACTIVE',
        EXECUTED = 'EXECUTED',
        PARTIALLY_FILLED = 'PARTIALLY FILLED',
        CANCELED = 'CANCELED',
      }
      enum type {
        MARKET = 'MARKET',
        EXCHANGE_MARKET = 'EXCHANGE MARKET',
        LIMIT = 'LIMIT',
        EXCHANGE_LIMIT = 'EXCHANGE LIMIT',
        STOP = 'STOP',
        EXCHANGE_STOP = 'EXCHANGE STOP',
        TRAILING_STOP = 'TRAILING STOP',
        EXCHANGE_TRAILING_STOP = 'EXCHANGE TRAILING STOP',
        FOK = 'FOK',
        EXCHANGE_FOK = 'EXCHANGE FOK',
        STOP_LIMIT = 'STOP LIMIT',
        EXCHANGE_STOP_LIMIT = 'EXCHANGE STOP LIMIT'
      }
    }

    class PublicTrade extends Model {
      id: number;
      mts: number;
      amount: number;
      price: number;
      constructor(data: any);
    }

    namespace PublicTrade {
      function unserialize(arr: any): any;
    }

    class Candle extends Model {
      mts: number;
      open: number;
      close: number;
      high: number;
      low: number;
      volume: number;
      constructor(data: any);
    }

    namespace Candle {
      function unserialize(arr: any): any;
    }

    class Position extends Model {
      symbol: string;
      status: string;
      amouunt: number;
      basePrice: number;
      marginFunding: number;
      marginFundingType: string;
      pl: number;
      plPerc: number;
      liquidationPrice: number;
      leverage: number;
      constructor(data: any);
    }

    namespace Position {
      function unserialize(arr: any): any;
      enum status {
        ACTIVE = 'ACTIVE',
        CLOSED = 'CLOSED',
      }
    }

    class Trade extends Model {
      id: number;
      pair: string;
      mtsCreate: number;
      orderID: number;
      execAmount: number;
      execPrice: number;
      orderType: string;
      orderPrice: number;
      maker: string;
      fee: number;
      feeCurrency: string;
      constructor(data: any);
    }

    namespace Trade {
      function unserialize(arr: any): any;
    }

    class Wallet extends Model {
      type: string;
      cuurrency: string;
      balance: number;
      unsettledInterest: number;
      balanceAvailable: number;
      constructor(data: any);
    }

    namespace Wallet {
      function unserialize(arr: any): any;
      enum type {
        exchange = 'EXCHANGE',
        margin = 'MARGIN',
        funding = 'FUNDING',
      }
    }
  }

  class RESTv2 {
    constructor(opts: IRESTv2Opts);
    status(cb?: () => any): any;
    ticker(symbol: string, cb: () => any): any;
    tickers(symbols: string[], cb?: () => any): Promise<any>;
    stats(key: string, context: string, cb: () => any): any;
    candles(opts: IRestv2Candles, cb: () => any): any;
    alertList(type: string, cb: () => any): any;
    alertSet(type: string, symbol: string, price: number, cb: () => any): any;
    alertDelete(symbol: string, price: number, cb: () => any): any;
    trades(symbol: string, cb: () => any, start?: number, end?: number,
      limit?: number, sort?: number, ): any;
    accountTrades(symbol: string, cb: () => any, start?: number, end?: number,
      limit?: number, sort?: number, ): any;
    wallets(cb: () => any): any;
    activeOrders(): void;
    movements(): void;
    ledgers(): void;
    orderHistory(): void;
    orderTrades(): void;
    positions(): void;
    fundingOffers(): void;
    fundingOfferHistory(): void;
    fundingLoans(): void;
    fundingLoanHistory(): void;
    fundingCredits(): void;
    fundingCreditHistory(): void;
    fundingTrades(): void;
    marginInfo(): void;
    fundingInfo(): void;
    performance(): void;
    calcAvailableBalance(): void;
    symbols(): void;
    symbolDetails(cb: (symbols: any) => any): any;
    accountInfo(): void;
    accountFees(): void;
    accountSummary(): void;
    deposit(): void;
    withdraw(): void;
    transfer(): void;
    keyPermissions(): void;
    balances(): void;
    claimPosition(): void;
    closePosition(): void;
    updateSettings(): void;
    deleteSettings(): void;
    getSettings(): void;
    exchangeRate(): void;
  }

  namespace WSv2 {
    enum INFO_CODES {
      SERVER_RESTART = 20051,
      MAINTENANCE_START = 20060,
      MAINTENANCE_END = 20061,
    }
    enum FLAGS {
      DEC_S = 8, // enables all decimals as strings
      TIME_S = 32, // enables all timestamps as strings
      TIMESTAMP = 32768, // timestamps in milliseconds
      SEQ_ALL = 65536, // enable sequencing
      CHECKSUM = 131072 // enable checksum per OB change, top 25 levels per-side
    }

    interface IWSv2Opts {
      apiKey?: string;
      apiSecret?: string;
      url?: string;
      orderOpBufferDelay?: number;
      transform?: boolean;
      agent?: any;
      manageOrderBooks?: boolean;
      manageCandles?: boolean;
      seqAudit?: boolean;
      autoReconnect?: boolean;
      reconnectDelay?: number;
      packetWDDelay?: number;
    }

    interface IWSv2getChannelData {
      chanId: number;
      channel?: string;
      symbol?: string;
      key?: string;
    }

    interface IWSv2onMessage {
      cbGID?: string;
    }

    interface IWSv2onWallet {
      cbGID?: string;
    }

    interface IWSv2onCandle {
      key?: string;
      cbGID?: string;
    }

    interface IWSv2onOrderBook {
      symbol?: string;
      prec?: string;
      len?: string;
      cbGID?: string;
    }

    interface IWSv2onTrades {
      pair?: string;
      cbGID?: string;
    }

    interface IWSv2onTicker {
      symbol?: string;
      cbGID?: string;
    }

    interface IWSv2onOrderSnapshot {
      symbol?: string;
      id?: number;
      cid?: number;
      gid?: number;
      cbGID?: string;
    }

    interface IWSv2onOrderNew {
      symbol?: string;
      id?: number;
      cid?: number;
      gid?: number;
      cbGID?: string;
    }

    interface IWSv2onOrderClose {
      symbol?: string;
      id?: number;
      gid?: number;
      cid?: number;
      cbGID?: string;
    }

    interface IWSv2onOrderUpdate {
      symbol?: string;
      id?: number;
      gid?: number;
      cid?: number;
      cbGID?: string;
    }

    interface IWSv2onPosition {
      symbol?: string;
      cbGID?: string;
    }
  }

  class WSv2 extends EventEmitter {
    constructor(opts: WSv2.IWSv2Opts);
    open(): Promise<any>;
    close(code: number, reason: string): Promise<any>;
    auth(calc?: number, dms?: number): Promise<any>;
    reconnect(): Promise<any>;
    getCandles(key: string): Models.Candle[];
    managedSubscribe(channel: string, identifier: string, payload: any): boolean;
    managedUnsubscribe(channel: string, identifier: string): boolean;
    getChannelData(opts: WSv2.IWSv2getChannelData): any;
    send(msg: any): void;
    enableSequencing(args: any): Promise<any>;
    enableFlag(flag: number): Promise<any>;
    isFlagEnabled(flag: number): boolean;
    onServerRestart(cb: () => any): void;
    onMaintenanceStart(cb: () => any): void;
    onMaintenanceEnd(cb: () => any): void;
    subscribe(channel: string, payload: any): void;
    subscribeTicker(symbol: string): void;
    subscribeTrades(symbol: string): void;
    subscribeOrderBook(symbol: string, prec?: string, len?: string): boolean;
    subscribeCandles(key: string): boolean;
    unsubscribe(chanId: number): void;
    unsubscribeTicker(symbol: string): boolean;
    unsubscribeTrades(symbol: string): boolean;
    unsubscribeOrderBook(symbol: string, prec?: string, len?: string): boolean;
    unsubscribeCandles(symbol: string, frame: string): boolean;
    removeListeners(cbGID: string): void;
    requestCalc(prefixes: string[]): void;
    submitOrder(order: any | any[]): Promise<any>;
    updateOrder(changes: any): Promise<any>;
    cancelOrder(order: any | any[] | number): Promise<any>;
    cancelOrders(orders: any[] | any[][] | number[]): Promise<any>;
    submitOrderMultiOp(opPayloads: any[]): Promise<any>;
    isAuthenticated(): boolean;
    isOpen(): boolean;
    isReconnecting(): boolean;
    notifyUI(type: string, message: string): void;
    onInfoMessage(code: number, cb: (...args: any[]) => any): void;
    onMessage(opts: WSv2.IWSv2onMessage, cb: (...args: any[]) => any): void;
    onCandle(opts: WSv2.IWSv2onCandle, cb: (candle: Models.Candle) => any): void;
    onOrderBook(opts: WSv2.IWSv2onOrderBook, cb: (...args: any[]) => any): void; // Change args when model made
    onOrderBookChecksum(opts: WSv2.IWSv2onOrderBook, cb: (...args: any[]) => any): void;
    onTrades(opts: WSv2.IWSv2onTrades, cb: (trade: Models.PublicTrade) => any): void;
    onTicker(opts: WSv2.IWSv2onTicker, cb: (...args: any[]) => any): void;
    onOrderSnapshot(opts: WSv2.IWSv2onOrderSnapshot, cb: (orderSnapshot: Models.Order[]) => any): void;
    onOrderNew(opts: WSv2.IWSv2onOrderNew, cb: (order: Models.Order) => any): void;
    onOrderUpdate(opts: WSv2.IWSv2onOrderUpdate, cb: (order: Models.Order) => any): void;
    onOrderClose(opts: WSv2.IWSv2onOrderClose, cb: (order: Models.Order) => any): void;
    onPositionSnapshot(opts: WSv2.IWSv2onPosition, cb: (positionSnapshot: Models.Position[]) => any): void;
    onPositionNew(opts: WSv2.IWSv2onPosition, cb: (position: Models.Position) => any): void;
    onPositionUpdate(opts: WSv2.IWSv2onPosition, cb: (position: Models.Position) => any): void;
    onPositionClose(opts: WSv2.IWSv2onPosition, cb: (position: Models.Position) => void): void;
    onTradeEntry(opts: WSv2.IWSv2onTrades, cb: (trade: Models.Trade) => void): void;
    onTradeUpdate(opts: WSv2.IWSv2onTrades, cb: (trade: Models.Trade) => void): void;
    onFundingOfferSnapshot(): void;
    onFundingOfferNew(): void;
    onFundingOfferUpdate(): void;
    onFundingOfferClose(): void;
    onFundingCreditSnapshot(): void;
    onFundingCreditNew(): void;
    onFundingCreditUpdate(): void;
    onFundingCreditClose(): void;
    onFundingLoanSnapshot(): void;
    onFundingLoanNew(): void;
    onFundingLoanUpdate(): void;
    onFundingLoanClose(): void;
    onWalletSnapshot(opts: WSv2.IWSv2onWallet, cb: (walletSnapshot: Models.Wallet[]) => any): void;
    onWalletUpdate(opts: WSv2.IWSv2onWallet, cb: (wallet: Models.Wallet) => any): void;
    onBalanceInfoUpdate(opts: WSv2.IWSv2onWallet, cb: (...args: any[]) => any): void; // maybe make a cbGID interface?
    onMarginInfoUpdate(opts: WSv2.IWSv2onWallet, cb: (...args: any[]) => any): void;
    onFundingInfoUpdate(): void;
    onFundingTradeEntry(): void;
    onFundingTradeUpdate(): void;
    onNotification(): void;
  }
}

export = BFX;


// export default BFX;
// export { WSv2 as WSv2 };
// export { RESTv1 as RESTv1 };
// export { RESTv2 as RESTv2 };
// export { Models as Models };

// export Models;
// export = BFX;
// export as namespace bitfinexApiNode;

// module.exports = BFX;
// // module.exports.RESTv1 = RESTv1;
// module.exports.RESTv2 = RESTv2;
// // module.exports.WSv1 = WSv1;
// module.exports.WSv2 = WSv2;
// module.exports.Models = Models;
