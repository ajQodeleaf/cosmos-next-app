import { useManager } from "@cosmos-kit/react";
import { Center, Grid, GridItem, Box, Button } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import {
  ChainOption,
  ChooseChain,
  handleSelectChainDropdown,
  ConnectWalletButton,
} from ".";
import { ChainName } from "@cosmos-kit/core";
import { WalletCardSection } from "./card";
import { useRouter } from "next/router";
import { useChain } from "@cosmos-kit/react";
import { useWalletProvider } from "../context/WalletContext";

export const WalletSection = () => {
  const [chainName, setChainName] = useState<ChainName | undefined>(
    "cosmoshub"
  );
  const { chain, setChain } = useWalletProvider();
  const router = useRouter();
  const { isWalletConnected } = useChain(chainName ?? "");
  const { chainRecords, getChainLogo } = useManager();

  const chainOptions = useMemo(
    () =>
      chainRecords.map((chainRecord) => {
        return {
          chainName: chainRecord?.name,
          label: chainRecord?.chain.pretty_name,
          value: chainRecord?.name,
          icon: getChainLogo(chainRecord.name),
        };
      }),
    [chainRecords, getChainLogo]
  );

  useEffect(() => {
    setChainName(window.localStorage.getItem("selected-chain") || "cosmoshub");
  }, []);

  useEffect(() => {
    if (chainName !== undefined) {
      setChain(chainName);
    }
  }, [chainName]);

  const onChainChange: handleSelectChainDropdown = async (
    selectedValue: ChainOption | null
  ) => {
    setChainName(selectedValue?.chainName);
    if (selectedValue?.chainName) {
      window?.localStorage.setItem("selected-chain", selectedValue?.chainName);
    } else {
      window?.localStorage.removeItem("selected-chain");
    }
  };

  const chooseChain = (
    <ChooseChain
      chainName={chainName}
      chainInfos={chainOptions}
      onChange={onChainChange}
    />
  );
  return (
    <Center py={16}>
      <Grid
        w="full"
        maxW="sm"
        templateColumns="1fr"
        rowGap={4}
        alignItems="center"
        justifyContent="center"
      >
        <GridItem>{chooseChain}</GridItem>
        {chainName ? (
          <WalletCardSection chainName={chainName}></WalletCardSection>
        ) : (
          <ConnectWalletButton buttonText={"Connect Wallet"} isDisabled />
        )}
        <Box mt={8} textAlign="center">
          <Button
            colorScheme="primary"
            size="lg"
            width="400px"
            disabled={isWalletConnected ? false : true}
            onClick={() => {
              if (isWalletConnected) {
                router.push("/sendTokens");
              }
            }}
          >
            SEND TOKENS
          </Button>
        </Box>
        <Box mt={8} textAlign="center">
          <Button
            colorScheme="primary"
            size="lg"
            width="400px"
            disabled={isWalletConnected ? false : true}
            onClick={() => {
              if (isWalletConnected) {
                router.push("/multiSendTokens");
              }
            }}
          >
            MULTI SEND TOKENS
          </Button>
        </Box>
      </Grid>
    </Center>
  );
};
