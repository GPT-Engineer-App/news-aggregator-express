import React, { useEffect, useState } from "react";
import { Container, VStack, Text, Heading, Box, Spinner, Link, Image } from "@chakra-ui/react";
import { FaNewspaper } from "react-icons/fa";

const Index = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch news from AWS Lambda endpoint
    const fetchNews = async () => {
      try {
        const response = await fetch("YOUR_AWS_LAMBDA_ENDPOINT");
        const data = await response.json();
        setNews(data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" mb={4}>
          <FaNewspaper /> ニュースアグリゲーター
        </Heading>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          news.map((article, index) => (
            <Box key={index} p={5} shadow="md" borderWidth="1px" borderRadius="md" width="100%">
              <Heading fontSize="xl">
                <Link href={article.url} isExternal>
                  {article.title}
                </Link>
              </Heading>
              <Text mt={4}>{article.description}</Text>
              {article.urlToImage && <Image src={article.urlToImage} alt={article.title} mt={4} borderRadius="md" />}
            </Box>
          ))
        )}
      </VStack>
    </Container>
  );
};

export default Index;
