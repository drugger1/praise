import {
  Avatar,
  AvatarBadge,
  Box,
  Container,
  Flex,
  Grid,
  Image,
  Text
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface Resp {
  discord_status: 'online' | 'dnd' | 'idle';
  discord_user: {
    username: string;
    avatar: string;
    id: string;
  };
  spotify: {
    song: string;
    artist: string;
    album: string;
    album_art_url: string | null;
  } | null;
  activities: {
    name: string;
    type: number;
    details?: string;
    state?: string;
  }[];
}

const Home = () => {
  const [data, setData] = useState<Resp | null>(null);

  useEffect(() => {
    const ID = '1124857142248214529';

    fetch(`https://api.lanyard.rest/v1/users/${ID}`)
      .then((res) => res.json())
      .then((res) => {
        console.log('Fetched data:', res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.error('Error fetching Discord status:', error);
      });
  }, []);

  return (
    <Container
      maxW="sm"
      p={4}
      bg="gray.800"
      boxShadow="lg"
      borderRadius="lg"
      border="1px solid gray.600"
      backdropFilter="blur(10px)"
    >
      <Grid templateColumns="auto 1fr auto" gap={3} alignItems="center">
        <Avatar
          src={`https://cdn.discordapp.com/avatars/${data?.discord_user.id}/${data?.discord_user.avatar}.png`}
          size="md"
        >
          <AvatarBadge
            boxSize="1em"
            bg={
              data?.discord_status === 'online'
                ? 'green.500'
                : data?.discord_status === 'dnd'
                ? 'red.500'
                : data?.discord_status === 'idle'
                ? 'yellow.500'
                : 'gray.500'
            }
          />
        </Avatar>
        <Flex flexDirection="column" alignItems="flex-start">
          <Text fontSize="lg" color="white" fontWeight="bold">
            {data?.discord_user.username}
          </Text>
          {data?.spotify ? (
            <Flex alignItems="center">
              <Text fontSize="sm" color="gray.300" mr={0}>
                <Text as="span" fontWeight="bold" color="white">Listening to</Text> {data.spotify.song} by {data.spotify.artist}
              </Text>
            </Flex>
          ) : (
            <Text fontSize="sm" color="gray.300">
              {data && data.activities && data.activities.length > 0 ? (
                data.activities.map((activity, index) => (
                  <Text key={index} fontSize="sm" color="gray.300">
                    {activity.type === 4 && activity.name === "Custom Status" ? (
                      activity.state
                    ) : (
                      `Playing ${activity.name}`
                    )}
                  </Text>
                ))
              ) : (
                "Offline"
              )}
            </Text>
          )}
        </Flex>
        {data?.spotify && data.spotify.album_art_url && (
          <Box>
            <Image
              src={data.spotify.album_art_url}
              alt="Album Cover"
              boxSize="70px"
              borderRadius="md"
            />
          </Box>
        )}
      </Grid>
    </Container>
  );
};

export default Home;