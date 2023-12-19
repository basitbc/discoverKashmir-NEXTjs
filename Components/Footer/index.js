import { Fab, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import styles from "../../styles/Footer.module.css";
import detailsData from "../../Data/Details.json";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CallIcon from "@mui/icons-material/Call";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import logoBlack from "../../public/Assets/logo/logo-blackColor.png";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Image from "next/image";
import { Link as LinkMUI } from "@mui/material";
import Link from "next/link";
const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"), {
    defaultMatches: true,
  });

  return (
    <Grid
      container
      sx={{
        display: "flex",
        padding: { xs: "10px 30px 0 30px", md: "50px 100px 0 120px" },
        // border: '1px solid black',
        zIndex: "-1",
        backgroundColor: "rgb(255, 250, 243)",
        alignItems: { xs: "center" },
        mt: "30px",
      }}
    >
      <Grid
        container
        className={styles.ftrOuterContainer}
        // border='1px solid black'
        sx={{
          flexDirection: { xs: "column", md: "row" },
          // alignItems: 'center',
        }}
      >
        <Grid
          item
          // xs={12}
          // md={4}
          className={styles.ftrInnerContainerLeft}
          // border='1px solid black'
          sx={{
            alignItems: "center",
          }}
        >
          <Grid
            item
            sx={{ mb: "10px" }}
            // border='1px solid black'
          >
            {/* <Typography
              variant='bold'
              sx={{
                fontFamily: 'roboto',
                color: 'black',
                fontSize: { xs: '37px', md: '57px' },
                fontFamily: 'Caveat Brush, cursive',
              }}
            >
              {logoBlack}
            </Typography> */}
            <Image
              src={logoBlack}
              style={{ height: isMobile ? "50px" : "90px", width: "auto" }}
              alt="logoDk"
            />
          </Grid>
          <Grid item sx={{ mb: "40px", zIndex: "-1" }}>
            <LinkMUI
              target={"_blank"}
              href="https://www.instagram.com/discoverkashmir1/"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Fab size="small" aria-label="like" sx={{ marginRight: "10px" }}>
                {/* <i className={styles.fa fa-instagram' style={{ fontSize: '23px' }}></i> */}
                <InstagramIcon />
              </Fab>
            </LinkMUI>
            <LinkMUI
              target={"_blank"}
              href="https://www.facebook.com/discoverkashmir1/?mibextid=ZbWKwL"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Fab size="small" aria-label="like" sx={{ marginRight: "10px" }}>
                {/* <i className={styles.fa fa-facebook' style={{ fontSize: '23px' }}></i> */}
                <FacebookOutlinedIcon />
              </Fab>
            </LinkMUI>
            <LinkMUI
              target={"_blank"}
              href="https://www.linkedin.com/company/discover-kashmir/"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Fab size="small" aria-label="like" sx={{ marginRight: "10px" }}>
                {/* <i className={styles.fa fa-linkedin' style={{ fontSize: '23px' }}></i> */}
                <LinkedInIcon />
              </Fab>
            </LinkMUI>
            <LinkMUI
              target={"_blank"}
              href="https://twitter.com/Discoverkashmir"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Fab size="small" aria-label="like" sx={{ marginRight: "10px" }}>
                {/* <i className={styles.fa fa-twitter' style={{ fontSize: '23px' }}></i> */}
                <TwitterIcon />
              </Fab>
            </LinkMUI>
            <LinkMUI
              target={"_blank"}
              href="https://www.youtube.com/@discoverkashmir6312"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Fab size="small" aria-label="like" sx={{ marginRight: "10px" }}>
                {/* <i className={styles.fa fa-youtube' style={{ fontSize: '23px' }}></i> */}
                <YouTubeIcon />
              </Fab>
            </LinkMUI>
          </Grid>
        </Grid>

        <Grid
          item
          // xs={12}
          // md={8}
          // border='2px solid blue'
          className={styles.ftrInnerContainerRight}
          sx={{
            flexDirection: { xs: "column", md: "row" },
            alignItems: "flex-start",
          }}
        >
          <Grid
            item
            md={3}
            //  border='2px solid red'
            marginRight="70px"
            sx={{ mb: "20px" }}
          >
            <Typography variant="bold" className={styles.ftrText}>
              About
            </Typography>
            <Typography
              sx={{
                fontFamily: "Montserrat, Arial, sans-serif",
                fontSize: "14px",
                marginTop: "10px",
              }}
              className={styles.ftrTextParagraph}
            >
              Discover Kashmir is an Adventure Travel Planner operating across
              North India. We organize treks, skiing, snowboarding, climbing,
              camping and many adventure related expeditions.
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            md={1.5}
            sx={{ mb: "20px" }}
            //  border='2px solid red'
          >
            <Typography variant="bold" className={styles.ftrText}>
              Menu
            </Typography>
            <Link href={"/"} style={{ color: "black" }}>
              <Typography
                sx={{
                  margin: "10px 0",
                  textDecoration: "underline",

                  fontFamily: "Montserrat, Arial, sans-serif",
                  fontSize: "14px",
                }}
                className={styles.ftrTextParagraph}
              >
                Home
              </Typography>
            </Link>
            <Link href={"/travelblogs"} style={{ color: "black" }}>
              <Typography
                sx={{
                  margin: "10px 0",
                  textDecoration: "underline",
                  fontFamily: "Montserrat, Arial, sans-serif",
                  fontSize: "14px",
                }}
                className={styles.ftrTextParagraph}
              >
                travel Blogs
              </Typography>
            </Link>
            <Link href={"/packages"} style={{ color: "black" }}>
              <Typography
                sx={{
                  margin: "10px 0 ",
                  textDecoration: "underline",
                  fontFamily: "Montserrat, Arial, sans-serif",
                  fontSize: "14px",
                }}
                className={styles.ftrTextParagraph}
              >
                Packages
              </Typography>
            </Link>
            <Link href={"/contact"} style={{ color: "black" }}>
              <Typography
                sx={{
                  margin: "10px 0 ",
                  textDecoration: "underline",
                  fontFamily: "Montserrat, Arial, sans-serif",
                  fontSize: "14px",
                }}
                className={styles.ftrTextParagraph}
              >
                Contact Us
              </Typography>
            </Link>
          </Grid>
          <Grid
            item
            xs={6}
            md={2}
            sx={{ mb: "20px" }}
            //  border='2px solid red'
          >
            <Typography variant="bold" className={styles.ftrText}>
              CUSTOMER POLICIES
            </Typography>
            <Link href={"/disclaimer"} style={{ color: "black" }}>
              <Typography
                sx={{
                  margin: "10px 0",
                  textDecoration: "underline",

                  fontFamily: "Montserrat, Arial, sans-serif",
                  fontSize: "14px",
                }}
                className={styles.ftrTextParagraph}
              >
                Disclaimer
              </Typography>
            </Link>
            <Link href={"/cancellations-policy"} style={{ color: "black" }}>
              <Typography
                sx={{
                  margin: "10px 0",
                  textDecoration: "underline",
                  fontFamily: "Montserrat, Arial, sans-serif",
                  fontSize: "14px",
                }}
                className={styles.ftrTextParagraph}
              >
                Cancellations Policy
              </Typography>
            </Link>
            <Link href={"/terms-and-conditions"} style={{ color: "black" }}>
              <Typography
                sx={{
                  margin: "10px 0 ",
                  textDecoration: "underline",
                  fontFamily: "Montserrat, Arial, sans-serif",
                  fontSize: "14px",
                }}
                className={styles.ftrTextParagraph}
              >
                Terms And Conditions
              </Typography>
            </Link>
            <Link href={"/privacy-policy"} style={{ color: "black" }}>
              <Typography
                sx={{
                  margin: "10px 0 ",
                  textDecoration: "underline",
                  fontFamily: "Montserrat, Arial, sans-serif",
                  fontSize: "14px",
                }}
                className={styles.ftrTextParagraph}
              >
                Privacy Policy
              </Typography>
            </Link>
          </Grid>

          <Grid
            item
            // border='2px solid red'
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="bold" className={styles.ftrText}>
              Contact
            </Typography>
            <Grid
              container
              sx={{
                display: "flex",
                flexDirection: "column",
                mt: "20px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Montserrat, Arial, sans-serif",
                  fontSize: "14px",
                }}
              >
                <a
                  style={{ textDecoration: "none", color: "black" }}
                  href={`tel:${detailsData.phoneNumber}`}
                >
                  <CallIcon style={{ marginRight: "20px" }} />

                  {detailsData.phoneNumber}
                </a>
              </Typography>
            </Grid>
            <Grid
              container
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Montserrat, Arial, sans-serif",
                  fontSize: "14px",
                }}
              >
                <WhatsAppIcon style={{ marginRight: "20px" }} />
                <LinkMUI
                  target={"_blank"}
                  href={`https://wa.me/${detailsData.whatsappNumber}?text=Hello discover kashmir, I want to get my customized package for my trip to Kashmir `}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {detailsData.whatsappNumber}
                </LinkMUI>
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Montserrat, Arial, sans-serif",
                  fontSize: "14px",
                }}
              >
                <MailOutlineIcon style={{ marginRight: "20px" }} />
                <a
                  style={{ textDecoration: "none", color: "black" }}
                  target={"_blank"}
                  href={`mailto:${detailsData.email}`}
                >
                  {detailsData.email}
                </a>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} md={2} sx={{ mt: { xs: "20px", md: "0px" } }}>
            <Typography variant="bold" className={styles.ftrText}>
              Address
            </Typography>
            <Typography
              sx={{
                margin: "10px 0 ",
                fontFamily: "Montserrat, Arial, sans-serif",
                fontSize: "14px",
              }}
            >
              <GpsFixedIcon style={{ marginRight: "10px" }} />
              {detailsData.address}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: { xs: "0 0px 30px 0px", md: "0 30px 30px 30px" },
          paddingTop: "20px",
          borderTop: "1px solid #CCCCCC",
          height: "30px",
          width: { xs: "97vw", md: "90vw" },
        }}
      >
        <Typography
          sx={{ fontSize: { xs: "9px", md: "12px" } }}
          className={styles.ftrTextParagraph}
        >
          © 2022 Discover Kashmir. All Rights Reserved
        </Typography>
        <Typography
          sx={{ fontSize: { xs: "9px", md: "12px" } }}
          fontFamily="lato"
          className={styles.ftrTextParagraph}
        >
          Developed by{" "}
          <a
            href="https://basitchanna.netlify.app/"
            style={{ color: "#DC834E", textDecoration: "none" }}
          >
            Basit Channa
          </a>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
