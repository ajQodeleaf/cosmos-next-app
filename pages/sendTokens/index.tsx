import {
  Flex,
  Box,
  Container,
  Text,
  Button,
  InputGroup,
  Input,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useWalletProvider } from "../../context/WalletContext";
import { useState } from "react";

export default function SendTokensPage() {
  const [transferAmount, setTransferAmount] = useState(0);
  const [transferRecipient, setTransferRecipient] = useState("");
  const [isLoading,setIsLoading]=useState(false);
  const router = useRouter();
  const { signingStargateClient, activeAccountBalance, activeAccount } =
    useWalletProvider();

  const handleTransfer = async () => {
    try {
      setIsLoading(true);
      const amount = Math.floor(Number(transferAmount * 10 ** 6)).toString();

      const result = await signingStargateClient.sendTokens(
        activeAccount,
        transferRecipient,
        [{ denom: "uaxl", amount: amount }],
        {
          amount: [{ denom: "uaxl", amount: "500" }],
          gas: "200000",
        }
      );

      setIsLoading(false);
    } catch (error) {
      console.error("Error transferring tokens:", error);
      setIsLoading(false);
    }
  };

  return (
    <Flex direction="column" height="100vh">
      <Flex
        align="center"
        justify="space-between"
        bg="gray.400"
        p={4}
        height="20%"
      >
        <Text fontSize="xl">Send Tokens Page</Text>
        <Flex direction="column" textAlign="right">
          <Text fontSize="md">Account Address: {activeAccount}</Text>
          <Text fontSize="md">
            Account Balance: {activeAccountBalance / 10 ** 6} AXL
          </Text>
        </Flex>
      </Flex>
      <Box
        flex="1"
        p={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Container>
          <InputGroup mb={4}>
            <Input
              width="500px"
              placeholder="Receiver's Address"
              value={transferRecipient}
              onChange={(e) => setTransferRecipient(e.target.value)}
            />
          </InputGroup>
          <InputGroup mb={4}>
            <Input
              width="500px"
              placeholder="Amount to send"
              value={transferAmount}
              onChange={(e) => setTransferAmount(Number(e.target.value))}
            />
          </InputGroup>
          <div
            style={{
              marginTop: "20px",
              width: "500px",
              justifyContent: "space-between",
              alignItems:"center"
            }}
          >
            <Button
              variant="outline"
              colorScheme="teal"
              height="48px"
              border="2px"
              borderColor="teal.500"
              isLoading={isLoading}
              onClick={handleTransfer}
            >
              Send Tokens
            </Button>
            <Button
              variant="outline"
              colorScheme="blue"
              height="48px"
              border="2px"
              borderColor="blue.500"
              ml={2} // Margin-left
              onClick={() => {
                router.push("/multiSendTokens");
              }}
            >
              Multi Send {"\u{27A1}"}
            </Button>
          </div>
        </Container>
      </Box>
    </Flex>
  );
}
