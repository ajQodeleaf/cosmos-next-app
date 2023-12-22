import Head from "next/head";
import {
  Box,
  Heading,
  Container,
  Button,
  Flex,
  Icon,
  useColorMode,
} from "@chakra-ui/react";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { WalletSection } from "../components";

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Container maxW="5xl" py={10}>
        <Head>
          <title>Cosmos App</title>
          <meta name="description" content="Generated by create cosmos app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Flex justifyContent="end" mb={4}>
          <Button variant="outline" px={0} onClick={toggleColorMode}>
            <Icon
              as={colorMode === "light" ? BsFillMoonStarsFill : BsFillSunFill}
            />
          </Button>
        </Flex>
        <Box textAlign="center">
          <Heading
            as="h1"
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
            fontWeight="extrabold"
            mb={3}
          >
            Cosmos App
          </Heading>
        </Box>
        <WalletSection />
      </Container>
    </>
  );
}