import React, { createContext, useContext, useEffect, useState } from "react";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [signingStargateClient, setSigningStargateClient] = useState(null);
  const [stargateClient, setStargateClient] = useState(null);
  const [signer, setSigner] = useState(null);
  const [activeAccount, setActiveAccount] = useState("");
  const [activeAccountBalance, setActiveAccountBalance] = useState(0);
  const [chain, setChain] = useState("cosmoshub");

  return (
    <WalletContext.Provider
      value={{
        activeAccount,
        setActiveAccount,
        activeAccountBalance,
        setActiveAccountBalance,
        signingStargateClient,
        setSigningStargateClient,
        signer,
        setSigner,
        stargateClient,
        setStargateClient,
        chain,
        setChain,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletProvider = () => useContext(WalletContext);
