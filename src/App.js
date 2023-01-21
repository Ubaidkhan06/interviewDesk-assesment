import logo from './logo.svg';
import './App.css';
import { AppBar, Box, Button, Grid, IconButton, TextField, Toolbar, Typography, Link } from '@mui/material';
import { Search, SearchOutlined } from '@mui/icons-material';
import { Stack } from '@mui/system';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const userUrl = 'https://jsonplaceholder.typicode.com/users/1'

  const postUrl = 'https://jsonplaceholder.typicode.com/photos'

  const [userData, setUserData] = useState(undefined)
  const [posts, setPosts] = useState([])

  const fetchData = async (url) => {
    let result = await axios.get(url)
    return result.data
  }

  const loader = async () => {
    const user = await fetchData(userUrl)
    const posts = await fetchData(postUrl)
    setUserData(user)
    setPosts(posts)
  }

  useEffect(() => {
    loader()
  }, [])

  console.log('userData =>', userData)
  console.log('posts =>', posts)

  return (
    <Box bgcolor={'#FAFAFA'}>
      <AppBar sx={{ backgroundColor: 'white' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Typography color={'black'} fontSize={'3rem'} fontFamily={'billabong'}>Instagram</Typography>
          <TextField size='small' placeholder='Search'
            InputProps={{
              startAdornment: (
                <IconButton>
                  <SearchOutlined />
                </IconButton>
              ),
            }}
          />
          <Stack spacing={2} direction='row'>
            <Button
              size='small'
              variant='contained'
              sx={{
                fontWeight: 500,
                padding: '5px 1rem',
                borderRadius: '8px'
              }}
            >
              Log In
            </Button>
            <Button size='small'
              sx={{
                fontWeight: 500,
                padding: '5px 1rem',
                borderRadius: '8px'
              }}
            >
              Sign Up
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box padding={'7% 25% 5% 25%'}>
        <Grid container marginBottom={'3rem'}>
          <Grid item xs={4}>
            <img style={{ borderRadius: '100px' }} src={posts[0]?.thumbnailUrl} />
          </Grid>
          <Grid item xs={8}>
            <Box marginBottom={'2rem'} display='flex' gap={15} alignItems={'start'}>
              <Typography variant='h6'>
                {userData?.username}
              </Typography>
              <Stack direction={'row'} spacing={1}>
                <Button size='small'
                  sx={{
                    color: 'black',
                    fontWeight: 600,
                    backgroundColor: '#EFEFEF',
                    borderRadius: '8px',
                    padding: '5px 1rem',
                    ':hover': {
                      backgroundColor: 'gray',

                    }
                  }}>
                  Follow
                </Button>
                <Button
                  size='small'
                  sx={{
                    color: 'black',
                    fontWeight: 600,
                    backgroundColor: '#EFEFEF',
                    borderRadius: '8px',
                    padding: '5px 1rem',
                    ':hover': {
                      backgroundColor: 'gray'
                    }
                  }}>
                  Message
                </Button>
              </Stack>
            </Box>
            <Box
              display={'flex'}
              gap={3}
            >
              <Typography>
                <b>{posts?.length}</b> posts
              </Typography>
              <Typography>
                <b>232M</b> followers
              </Typography>
              <Typography>
                <b>262</b> following
              </Typography>
            </Box>
            <Box
              sx={{
                marginTop: '1rem',
              }}
            >
              <b>{userData?.name}</b>
              <Typography paddingTop={'8px'}>
                {userData?.company?.catchPhrase}
              </Typography>
              <Link sx={{ textDecoration: 'none' }}>{userData?.website}</Link>
            </Box>
          </Grid>
        </Grid>
        <hr />
      </Box>
      <Box display='flex' justifyContent={'center'} alignItems='center'>
        <Grid container width={'55vw'} spacing={3}>
              {posts?.map(post=>(
          <Grid item xs={4}>
            <img width='257px' src={post.url} />
          </Grid>
  
              ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default App;
