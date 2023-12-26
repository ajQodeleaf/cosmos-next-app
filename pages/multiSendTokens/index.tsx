import React, { useState, ChangeEvent } from "react";
import {
  Container,
  Text,
  Input,
  InputGroup,
  Button,
  Flex,
  Box,
} from "@chakra-ui/react";
import { useWalletProvider } from "../../context/WalletContext";
import { DeleteIcon } from "@chakra-ui/icons";

interface Transfer {
  recipient: string;
  amount: string;
}

const MultiSendTokensPage: React.FC = () => {
  const [transfers, setTransfers] = useState<Transfer[]>([
    { recipient: "", amount: "" },
  ]);

  const { activeAccountBalance, activeAccount, signingStargateClient } =
    useWalletProvider();

  const handleAddRecipient = () => {
    setTransfers([...transfers, { recipient: "", amount: "" }]);
  };

  const handleRemoveRecipient = (index: number) => {
    const updatedTransfers = [...transfers];
    updatedTransfers.splice(index, 1);
    setTransfers(updatedTransfers);
  };

  const handleRecipientChange = (
    index: number,
    field: keyof Transfer,
    value: string
  ) => {
    const updatedTransfers = [...transfers];
    updatedTransfers[index][field] = value;
    setTransfers(updatedTransfers);
  };

  const handleMultiSend = async () => {
    try {
      const messages = transfers.map(({ recipient, amount }) => {
        const amountInUaxl = (Number(amount) * 10 ** 6).toString();
        return {
          typeUrl: "/cosmos.bank.v1beta1.MsgMultiSend",
          value: {
            fromAddress: activeAccount,
            toAddress: recipient,
            amount: [{ denom: "uaxl", amount: amountInUaxl }],
          },
        };
      });

      const result = await signingStargateClient.signAndBroadcast(
        activeAccount,
        messages,
        {
          amount: [{ denom: "uaxl", amount: "500" }],
          gas: "200000",
        },
        "Multi send"
      );
      
    } catch (error) {
      console.error("Error transferring tokens:", error);
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
        <Text fontSize="xl">Multi-Send Tokens Page</Text>
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
        justifyContent="center"
        alignItems="center"
      >
        <Container>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            {transfers.map((transfer, index) => (
              <div
                key={index}
                style={{ display: "flex", alignItems: "stretch" }}
              >
                <InputGroup mb={4} flex="1">
                  <Input
                    height="48px"
                    width="240px"
                    mr={2}
                    placeholder="Transfer Recipient"
                    value={transfer.recipient}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      handleRecipientChange(index, "recipient", e.target.value);
                    }}
                  />
                </InputGroup>
                <InputGroup mb={4} flex="1">
                  <Input
                    height="48px"
                    width="240px"
                    placeholder="Transfer Amount (in AXL)"
                    value={transfer.amount}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleRecipientChange(index, "amount", e.target.value)
                    }
                  />
                </InputGroup>
                <Button
                  variant="outline"
                  colorScheme="red"
                  width="60px"
                  border="2px"
                  borderColor="red.500"
                  onClick={() => handleRemoveRecipient(index)}
                  ml={2} // Margin-left
                  height="48px" // Set the height of the button
                >
                  <DeleteIcon />
                </Button>
              </div>
            ))}
          </Box>

          <div style={{ marginTop: "20px" }}>
            <Button
              variant="outline"
              colorScheme="teal"
              height="48px"
              width="200px"
              border="2px"
              borderColor="teal.500"
              onClick={handleAddRecipient}
              mr={2}
            >
              Add Recipient
            </Button>
            <Button
              variant="outline"
              colorScheme="blue"
              height="48px"
              width="200px"
              border="2px"
              borderColor="blue.500"
              ml={2}
              onClick={handleMultiSend}
            >
              Multi Send
            </Button>
          </div>
        </Container>
      </Box>
    </Flex>
  );
};

export default MultiSendTokensPage;
