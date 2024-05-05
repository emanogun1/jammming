import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Card } from 'react-bootstrap';
import Search from './Search'; // Assuming your Search component is in a file named Search.js in the same directory


const CLIENT_ID = "49fd685d88b44505b2de3efc797df93c";
const CLIENT_SECRET = "4c7d938e1bfe4538a7aedb3784dd0fc9";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    // Fetch access token on component mount
    const fetchAccessToken = async () => {
      try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
        });
        const data = await response.json();
        setAccessToken(data.access_token);
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };
    fetchAccessToken();
  }, []);

  const search = async (query) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      const artistID = data.artists.items[0].id;
      const albumsResponse = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=UK&limit=50`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      const albumsData = await albumsResponse.json();
      setAlbums(albumsData.items);
    } catch (error) {
      console.error('Error searching for artist:', error);
    }
  };

  return (
    <div className="App">
      <Search onSearch={search} />
      <Container>
        <Row className="mx-2 row-cols-4">
          {albums.map((album, i) => (
            <Card key={i}>
              <Card.Img src={album.images[0].url} alt={album.name} />
              <Card.Body>
                <Card.Title>{album.name}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
