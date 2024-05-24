import { useState } from "react";
import { Container, VStack, Text, Box, Input, Button, HStack, IconButton } from "@chakra-ui/react";
import { FaThumbsUp, FaThumbsDown, FaLaugh, FaSadTear } from "react-icons/fa";
import { usePosts, useAddPost } from "../integrations/supabase/api";

const Index = () => {
  const { data: posts, isLoading, isError } = usePosts();
  const addPostMutation = useAddPost();
  const [newPost, setNewPost] = useState("");

  const addPost = () => {
    if (newPost.trim() !== "") {
      addPostMutation.mutate({ title: newPost, body: newPost });
      setNewPost("");
    }
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl" mb={4}>Public Postboard</Text>
        <HStack width="100%">
          <Input
            placeholder="Write a new post..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <Button onClick={addPost} colorScheme="blue">Post</Button>
        </HStack>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : isError ? (
          <Text>Error loading posts</Text>
        ) : (
          <VStack spacing={4} width="100%">
            {posts.map((post, index) => (
              <Box key={index} p={4} borderWidth="1px" borderRadius="md" width="100%">
                <Text mb={2}>{post.title}</Text>
                <HStack spacing={4}>
                  <IconButton
                    aria-label="Like"
                    icon={<FaThumbsUp />}
                    onClick={() => addReaction(index, "like")}
                  />
                  <Text>{post.reactions.like}</Text>
                  <IconButton
                    aria-label="Dislike"
                    icon={<FaThumbsDown />}
                    onClick={() => addReaction(index, "dislike")}
                  />
                  <Text>{post.reactions.dislike}</Text>
                  <IconButton
                    aria-label="Laugh"
                    icon={<FaLaugh />}
                    onClick={() => addReaction(index, "laugh")}
                  />
                  <Text>{post.reactions.laugh}</Text>
                  <IconButton
                    aria-label="Sad"
                    icon={<FaSadTear />}
                    onClick={() => addReaction(index, "sad")}
                  />
                  <Text>{post.reactions.sad}</Text>
                </HStack>
              </Box>
            ))}
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default Index;