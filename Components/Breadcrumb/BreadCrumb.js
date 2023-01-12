import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/router';
// import { useLocation } from 'react-router-dom';

const BreadCrumb = ({ usedIn }) => {
  const router = useRouter();
  const pathNames = router.asPath.split('/').filter((x) => x);

  return (
    <Breadcrumbs
      aria-label='breadcrumb'
      separator={
        <NavigateNextIcon
          fontSize='small'
          sx={{ color: usedIn == 'blog' ? 'black' : 'white' }}
        />
      }
      sx={{
        height: '40px',
        display: pathNames.length > 0 ? 'flex' : 'none',
        justifyContent: usedIn == 'blog' ? 'flex-start' : 'center',
        cursor: 'pointer',
        textAlign: 'center',
        bgcolor: 'transparent',
      }}
    >
      <Link
        underline='hover'
        color='inherit'
        style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          fontWeight: '900',
          // borderBottom: '2px solid',
          color: usedIn == 'blog' ? 'black' : 'white',
          fontSize: '17px',
        }}
        onClick={() => {
          router.replace('/'), '/';
        }}
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize='inherit' />
        <Typography
          sx={{
            color: usedIn == 'blog' ? 'black' : 'white',
            fontWeight: '900',
          }}
        >
          Home
        </Typography>
      </Link>
      {pathNames.map((name, index) => {
        const routeTo = `/${pathNames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathNames.length - 1;
        return isLast ? null : ( // </Typography> //   {name} // > //   }} //     fontSize: '17px', //     textTransform: 'capitalize', //     color: 'white', //   sx={{ // <Typography
          <Link
            underline='hover'
            color='inherit'
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              cursor: 'pointer',
              textTransform: 'capitalize',
              fontSize: '17px',
              color: usedIn == 'blog' ? 'black' : 'white',
              fontWeight: '900',
            }}
            onClick={() => {
              router.replace(routeTo), routeTo;
            }}
          >
            {name}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadCrumb;
