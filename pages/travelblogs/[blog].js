import { Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import styles from '../../styles/BlogDetails.module.css';
import { useRouter } from 'next/router';

const index = ({ blogData, relatedBlogs, packagesData }) => {
  const router = useRouter();

  // Navigating to a sibling article is a normal route change now — the page
  // re-renders from that slug's own getStaticProps instead of swapping state.
  const handleClickBlog = (item) => {
    router.push(`/travelblogs/${item.slug}`);
  };

  const ogImage = blogData.cardImage || blogData.bgImage || '';

  return (
    <div>
      <Head>
        <title>{blogData.metaTitle || blogData.title}</title>
        <meta
          name='description'
          content={
            blogData.metaDescription || (blogData.shortDes || '').slice(0, 142)
          }
        />
        {ogImage ? (
          <>
            <meta property='og:image' itemProp='image' content={ogImage} />
            <link itemProp='thumbnailUrl' href={ogImage} />
          </>
        ) : null}
      </Head>

      <Grid>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column-reverse', md: 'row' },
            overflow: 'hidden',
            flexWrap: 'nowrap',
            pt: { md: '70px' },
          }}
        >
          <Grid
            item
            sx={{
              width: { xs: '100%', md: '40%' },
              margin: {
                xs: '40px 80px 0 10px',
                md: '',
                lg: '140px 70px 0 20px',
              },
            }}
          >
            <BreadCrumb usedIn='blog' />
            <Typography
              sx={{
                fontSize: { xs: '27px', md: '35px' },
                letterSpacing: '-0.5px',
                lineHeight: { xs: '40px', md: '60.5px' },
                mb: '30px',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: '900',
              }}
            >
              {blogData.title}
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Montserrat', sans-serif",
                fontStyle: 'italic',
                fontSize: { xs: '18px', md: '23px' },
                lineHeight: { xs: '', md: '35.15px' },
                fontWeight: '300',
                letterSpacing: '-0.5px',
                color: 'gray',
                padding: { xs: '0 20px 0 0', md: '' },
              }}
            >
              {blogData.shortDes}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              position: 'relative',
              display: 'flex',
              margin: '-120px -70px 0 0',
              height: { xs: '63vh', md: '97vh', lg: '107vh' },
              ml: { xs: '-50px', md: '0px' },
              width: { xs: '130%', md: '60%' },
              overflow: 'hidden',
              // borderRadius: '46% 54% 44% 56% / 52% 33% 67% 48% ',
              // borderRadius: '35% 36% 52% 48% / 56% 30% 46% 45% ',
              borderRadius: {
                xs: '0% 0% 61% 49% / 66% 32% 27% 35% ',
                md: '35% 0% 61% 49% / 60% 0% 22% 40% ',
                lg: '  35% 0% 61% 49% / 50% 0% 59% 50%  ',
              },
            }}
          >
            <Image
              fill
              src={blogData.bgImage || blogData.cardImage || ''}
              alt={blogData.title}
              style={{
                borderRadius: {
                  xs: '0% 0% 61% 49% / 66% 32% 27% 35% ',
                  md: '35% 0% 61% 49% / 60% 0% 22% 40% ',
                  lg: '  35% 0% 61% 49% / 60% 0% 59% 40%  ',
                },
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}
        >
          {/* One for the left description of the blog */}
          <Grid item sx={{ display: 'flex', width: { xs: '100%', md: '67%' } }}>
            <Typography
              className={styles.span}
              sx={{
                fontSize: '19px',
                color: 'gray',
                p: { xs: '30px 20px 40px 20px', md: '0px 0 40px 70px' },
                fontFamily: "'Montserrat', sans-serif",
                whiteSpace: 'pre-wrap',
                lineHeight: '35px',
              }}
            >
              <span
                className={styles.span}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '19px',
                }}
                dangerouslySetInnerHTML={{
                  __html: [`${blogData.description}`],
                }}
              />
            </Typography>
          </Grid>
          {/* For the right section containg links */}
          <Grid
            item
            sx={{
              display: 'flex',
              width: { xs: '100%', md: '30%' },
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Grid
              sx={{
                // height: '20px',
                display: 'flex',

                margin: { md: '70px 0 10px 0px', xs: '10px 0 0 0' },
                width: { xs: '90vw', md: '340px' },
                justifyContent: 'center',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Headings,sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '1.1px',
                  fontWeight: 700,
                }}
              >
                Related Articles
              </Typography>
            </Grid>
            <Grid
              item
              display={'flex'}
              flexDirection='column'
              className={styles.bgGridRight}
              sx={{
                minHeight: { xs: '230px', md: '230px' },
                width: { xs: '90vw', md: '340px' },
                padding: { xs: '5px 5px', md: '10px 10px' },
                margin: { md: '5px 0px', xs: '10px 0' },
              }}
            >
              {relatedBlogs.map((item) => (
                <Grid
                  key={item.id}
                  onClick={() => {
                    handleClickBlog(item);
                  }}
                  container
                  display={'flex'}
                  alignItems='center'
                  flexDirection='row'
                  flexWrap={'nowrap'}
                  // boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
                  className={styles.bgInBox}
                >
                  <Grid
                    item
                    xs={4}
                    className={styles.bgInnerBox}
                    sx={{
                      position: 'relative',
                      height: { xs: '60px', md: '60px' },
                      width: '90px',
                      borderRadius: '14px',
                      // border: '3px solid',
                      objectFit: 'cover',
                      mr: '15px',
                    }}
                  >
                    <Image
                      src={item.cardImage || ''}
                      alt={item.title}
                      fill
                      style={{
                        // height: '100%',
                        // width: '100%',
                        borderRadius: '14px',
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={8}
                    sx={{
                      display: 'inline-block',
                      height: '55px',
                      textOverflow: 'ellipsis',
                      // border: '1px solid red',
                      overflow: 'hidden',
                    }}
                  >
                    <Typography
                      className={styles.textTitle}
                      sx={{
                        fontSize: { xs: '12px', md: '15px' },
                        fontWeight: '700',
                        fontFamily: 'Headings,',
                        letterSpacing: '0.3px',
                        lineHeight: '24.5px',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Grid item>
              <TopPicks BlogsData={relatedBlogs} packagesData={packagesData} />
            </Grid>
            <Grid item>
              <FacebookEmbed />
            </Grid>
            <Grid>
              <ShareButtons />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default index;

import TopPicks from '../../Components/TopPicks';
import FacebookEmbed from '../../Components/FacebookEmbed';
import Head from 'next/head';
import ShareButtons from '../../Components/ShareButtons';
import BreadCrumb from '../../Components/Breadcrumb/BreadCrumb';
import { blogsService, packagesService } from '../../services';
import { getSiteProps, REVALIDATE_SECONDS } from '../../lib/getSiteProps';

export async function getStaticProps({ params }) {
  // Resolve by slug. Previously this took no params and the component indexed
  // the array with router.query.id, so a bare slug rendered the wrong article.
  const blogData = await blogsService.getBySlug(params.blog);

  if (!blogData) return { notFound: true };

  const [{ items: blogItems }, { items: packagesData }] = await Promise.all([
    blogsService.list({ perPage: 4 }),
    packagesService.list({ perPage: 4 }),
  ]);

  const relatedBlogs = blogItems.filter((b) => b.id !== blogData.id).slice(0, 3);

  return {
    props: {
      ...(await getSiteProps()),
      blogData,
      relatedBlogs,
      packagesData,
    },
    revalidate: REVALIDATE_SECONDS,
  };
}

export async function getStaticPaths() {
  const blogs = await blogsService.listAll();

  return {
    paths: blogs.map((item) => ({ params: { blog: item.slug } })),
    fallback: 'blocking',
  };
}
